import { getYamlData } from '../utils/yaml'
import Tree from '../components/tree'

export default Tree

export async function getStaticProps () {
  return getYamlData('./data/meet.yaml')
}