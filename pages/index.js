import { getYamlData } from '../utils/yaml'
import Tree from '../components/tree'

export default Tree

export async function getServerSideProps () {
  return getYamlData('./data/index.yaml')
}