import { pack } from '../data/pack.ts';
import { withBase } from './paths.ts';
import { formatDate, statusText } from './content.ts';

// Small, deliberately limited substitutions keep annual facts out of Markdown prose.
export const tokens: Record<string, string> = {
  season: pack.season, youthFee: `$${pack.fees.youth}`, packDues: `$${pack.fees.dues}`,
  adultFee: `$${pack.fees.adult}`, totalFee: `$${pack.fees.youth + pack.fees.dues}`,
  duesDate: formatDate(pack.fees.dueDate), location: pack.location.name, address: pack.location.address,
  packSchedule: statusText(pack.schedules.pack),
  committeeSchedule: statusText(pack.schedules.committee),
};
type Node = { type: string; value?: string; url?: string; children?: Node[] };
export default function remarkPack() {
  return (tree: Node) => {
    const visit = (node: Node) => {
      if (node.type === 'text' && node.value) node.value = node.value.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
        if (!(key in tokens)) throw new Error(`Unknown Pack content token: ${key}`);
        return tokens[key];
      });
      if (node.url?.startsWith('pack:')) {
        const key = node.url.slice(5);
        if (!pack.links[key]) throw new Error(`Unknown Pack link: ${key}`);
        node.url = pack.links[key];
      } else if (node.url?.startsWith('/')) node.url = withBase(node.url, process.env.BASE_PATH);
      node.children?.forEach(visit);
    };
    visit(tree);
  };
}
