import { parse } from 'yaml'
import fs from 'fs/promises'
import { remark } from 'remark';
import html from 'remark-html';

const expCalculator = (date) => {
  const today = new Date();
  const expDate = new Date(date);
  const diff = Math.abs(today.getTime() - expDate.getTime());
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
  return Math.round(diffDays / 365);
}

const replaceWithExp = (string, exp) => {
  return exp.reduce((acc, [key, value]) => {
    return acc.replace(`$exp_${key}`, value);
  }, string)
}

const getMarkdown = async (content) => {
  const processedContent = await remark()
    .use(html)
    .process(content);
  return processedContent.toString();
}

export async function getYamlData(yamlFile) {
  const dataContent = await fs.readFile(yamlFile, 'utf8')
  const props = parse(dataContent)
  
  const exp = props.exp ? Object.entries(props.exp).map(([key, value]) => [key, expCalculator(value)]) : []
  
  props.infoList = props.infoList ? await Promise.all(props.infoList.map(i => {
    return getMarkdown(replaceWithExp(i, exp))
  })) : []

  props.bio = await getMarkdown(replaceWithExp(props.bio, exp))

  return { props }
}
