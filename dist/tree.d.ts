/**
 * 树形数据处理工具 - 列表与树的转换、查找、遍历
 */
interface TreeNode<T = any> {
    id: string | number;
    parentId?: string | number | null;
    children?: TreeNode<T>[];
    [key: string]: any;
}
interface TreeOptions {
    idKey?: string;
    parentIdKey?: string;
    childrenKey?: string;
    rootParentId?: any;
}
export type { TreeNode, TreeOptions };
/**
 * 列表转树形结构
 * @example listToTree(list, { idKey: 'id', parentIdKey: 'parentId', childrenKey: 'children' })
 */
declare function listToTree<T extends Record<string, any>>(list: T[], options?: TreeOptions): T[];
/**
 * 树形结构转列表（深度优先）
 * @example treeToList(tree, { childrenKey: 'children' })
 */
declare function treeToList<T extends Record<string, any>>(tree: T[], options?: TreeOptions): T[];
/**
 * 查找树节点
 * @example findNode(tree, node => node.id === 'target')
 */
declare function findNode<T extends Record<string, any>>(tree: T[], predicate: (node: T) => boolean, options?: TreeOptions): T | null;
/**
 * 查找节点路径
 * @example findPath(tree, node => node.id === 'target')
 */
declare function findPath<T extends Record<string, any>>(tree: T[], predicate: (node: T) => boolean, options?: TreeOptions): T[] | null;
/**
 * 过滤树节点
 * @example filterTree(tree, node => node.status === 'active')
 */
declare function filterTree<T extends Record<string, any>>(tree: T[], predicate: (node: T) => boolean, options?: TreeOptions): T[];
/**
 * 遍历树节点
 * @example forEachTree(tree, node => console.log(node.name))
 */
declare function forEachTree<T extends Record<string, any>>(tree: T[], callback: (node: T, index: number, parent?: T) => void, options?: TreeOptions): void;
/**
 * 映射树节点
 * @example mapTree(tree, node => ({ ...node, label: node.name }))
 */
declare function mapTree<T extends Record<string, any>, R extends Record<string, any>>(tree: T[], mapper: (node: T) => R, options?: TreeOptions): R[];
/**
 * 获取树的最大深度
 * @example getTreeDepth(tree)
 */
declare function getTreeDepth<T extends Record<string, any>>(tree: T[], options?: TreeOptions): number;
/**
 * 获取树的所有叶子节点
 * @example getLeafNodes(tree)
 */
declare function getLeafNodes<T extends Record<string, any>>(tree: T[], options?: TreeOptions): T[];
/**
 * 排序树节点
 * @example sortTree(tree, (a, b) => a.order - b.order)
 */
declare function sortTree<T extends Record<string, any>>(tree: T[], compareFn: (a: T, b: T) => number, options?: TreeOptions): T[];
/**
 * 查找节点的父节点
 * @example findParent(tree, node => node.id === 'child')
 */
declare function findParent<T extends Record<string, any>>(tree: T[], predicate: (node: T) => boolean, options?: TreeOptions): T | null;
/**
 * 查找节点的所有祖先
 * @example findAncestors(tree, node => node.id === 'child')
 */
declare function findAncestors<T extends Record<string, any>>(tree: T[], predicate: (node: T) => boolean, options?: TreeOptions): T[];
/**
 * 查找节点的所有后代
 * @example findDescendants(tree, node => node.id === 'parent')
 */
declare function findDescendants<T extends Record<string, any>>(tree: T[], predicate: (node: T) => boolean, options?: TreeOptions): T[];
/**
 * 树节点去重
 * @example uniqueTree(tree, node => node.id)
 */
declare function uniqueTree<T extends Record<string, any>>(tree: T[], getKey: (node: T) => any, options?: TreeOptions): T[];
/**
 * 扁平化树到指定深度
 * @example flattenToDepth(tree, 2)
 */
declare function flattenToDepth<T extends Record<string, any>>(tree: T[], depth: number, options?: TreeOptions): T[];
declare const tree: {
    listToTree: typeof listToTree;
    treeToList: typeof treeToList;
    findNode: typeof findNode;
    findPath: typeof findPath;
    findParent: typeof findParent;
    findAncestors: typeof findAncestors;
    findDescendants: typeof findDescendants;
    filterTree: typeof filterTree;
    forEachTree: typeof forEachTree;
    mapTree: typeof mapTree;
    sortTree: typeof sortTree;
    getTreeDepth: typeof getTreeDepth;
    getLeafNodes: typeof getLeafNodes;
    uniqueTree: typeof uniqueTree;
    flattenToDepth: typeof flattenToDepth;
};
export default tree;
//# sourceMappingURL=tree.d.ts.map