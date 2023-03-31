import { parse } from 'yaml'
import fs from 'fs/promises'
import path from 'path';
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

const expCalculator = (date) => {
  const today = new Date();
  const expDate = new Date(date);
  const diff = Math.abs(today.getTime() - expDate.getTime());
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
  return Math.floor(diffDays / 365);
}

const replaceWithExp = (string, exp) => {
  return exp.reduce((acc, [key, value]) => {
    return acc.replace(`$exp_${key}`, value);
  }, string)
}

const getMarkdown = async (content) => {
  return unified()
  .use(remarkParse) // Parse markdown content to a syntax tree
  .use(remarkRehype, {allowDangerousHtml: true}) // Turn markdown syntax tree to HTML syntax tree, ignoring embedded HTML
  .use(rehypeStringify, {allowDangerousHtml: true}) // Serialize HTML syntax tree
  .process(content)
  .then(file => String(file))
}

export async function getYamlData(yamlFile) {
  const dataContent = await fs.readFile(path.resolve(process.cwd(), 'public', yamlFile), 'utf8')
  const props = parse(dataContent)
  
  const exp = props.exp ? Object.entries(props.exp).map(([key, value]) => [key, expCalculator(value)]) : []
  
  props.infoList = props.infoList ? await Promise.all(props.infoList.map(i => {
    return getMarkdown(replaceWithExp(i, exp))
  })) : false

  props.keyedList = props.keyedList ? await Promise.all(props.keyedList.map(async i => {
    return {
      ...i,
      items: await Promise.all(i.items.map(v  => getMarkdown(replaceWithExp(v, exp))))
    }
  })) : false

  props.links = props.links ? await Promise.all(props.links.map(async i => {
    const possibleItems = i.items ? await Promise.all(i.items.map(v  => getMarkdown(replaceWithExp(v, exp)))) : false
    return {
      ...i,
      ...(possibleItems ? { items: possibleItems } : {})
    }
  })) : false

  props.bio = await getMarkdown(replaceWithExp(props.bio, exp))

  return { props }
}
