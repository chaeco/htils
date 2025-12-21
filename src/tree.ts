/**
 * 树形数据处理工具 - 列表与树的转换、查找、遍历
 */

interface TreeNode<T = any> {
  id: string | number
  parentId?: string | number | null
  children?: TreeNode<T>[]
  [key: string]: any
}

interface TreeOptions {
  idKey?: string
  parentIdKey?: string
  childrenKey?: string
  rootParentId?: any
}

export type { TreeNode, TreeOptions }

/**
 * 列表转树形结构
 * @example listToTree(list, { idKey: 'id', parentIdKey: 'parentId', childrenKey: 'children' })
 */
function listToTree<T extends Record<string, any>>(
  list: T[],
  options: TreeOptions = {}
): T[] {
  const {
    idKey = 'id',
    parentIdKey = 'parentId',
    childrenKey = 'children',
    rootParentId = null,
  } = options

  const map = new Map<any, T>()
  const result: T[] = []

  // 创建映射
  list.forEach(item => {
    map.set(item[idKey], { ...item, [childrenKey]: [] })
  })

  // 构建树
  list.forEach(item => {
    const node = map.get(item[idKey])
    const parentId = item[parentIdKey]

    if (parentId === rootParentId || parentId === undefined) {
      result.push(node!)
    } else {
      const parent = map.get(parentId)
      if (parent) {
        parent[childrenKey].push(node!)
      } else {
        // 找不到父节点，作为根节点
        result.push(node!)
      }
    }
  })

  return result
}

/**
 * 树形结构转列表（深度优先）
 * @example treeToList(tree, { childrenKey: 'children' })
 */
function treeToList<T extends Record<string, any>>(
  tree: T[],
  options: TreeOptions = {}
): T[] {
  const { childrenKey = 'children' } = options
  const result: T[] = []

  function traverse(nodes: T[], parent?: T) {
    nodes.forEach(node => {
      const { [childrenKey]: children, ...rest } = node
      result.push(rest as T)

      if (children && children.length > 0) {
        traverse(children, node)
      }
    })
  }

  traverse(tree)
  return result
}

/**
 * 查找树节点
 * @example findNode(tree, node => node.id === 'target')
 */
function findNode<T extends Record<string, any>>(
  tree: T[],
  predicate: (node: T) => boolean,
  options: TreeOptions = {}
): T | null {
  const { childrenKey = 'children' } = options

  for (const node of tree) {
    if (predicate(node)) {
      return node
    }

    if (node[childrenKey] && node[childrenKey].length > 0) {
      const found = findNode(node[childrenKey], predicate, options)
      if (found) return found
    }
  }

  return null
}

/**
 * 查找节点路径
 * @example findPath(tree, node => node.id === 'target')
 */
function findPath<T extends Record<string, any>>(
  tree: T[],
  predicate: (node: T) => boolean,
  options: TreeOptions = {}
): T[] | null {
  const { childrenKey = 'children' } = options

  function traverse(nodes: T[], path: T[]): T[] | null {
    for (const node of nodes) {
      const currentPath = [...path, node]

      if (predicate(node)) {
        return currentPath
      }

      if (node[childrenKey] && node[childrenKey].length > 0) {
        const found = traverse(node[childrenKey], currentPath)
        if (found) return found
      }
    }

    return null
  }

  return traverse(tree, [])
}

/**
 * 过滤树节点
 * @example filterTree(tree, node => node.status === 'active')
 */
function filterTree<T extends Record<string, any>>(
  tree: T[],
  predicate: (node: T) => boolean,
  options: TreeOptions = {}
): T[] {
  const { childrenKey = 'children' } = options

  function filter(nodes: T[]): T[] {
    return nodes
      .filter(predicate)
      .map(node => {
        if (node[childrenKey] && node[childrenKey].length > 0) {
          return {
            ...node,
            [childrenKey]: filter(node[childrenKey]),
          }
        }
        return node
      })
  }

  return filter(tree)
}

/**
 * 遍历树节点
 * @example forEachTree(tree, node => console.log(node.name))
 */
function forEachTree<T extends Record<string, any>>(
  tree: T[],
  callback: (node: T, index: number, parent?: T) => void,
  options: TreeOptions = {}
): void {
  const { childrenKey = 'children' } = options

  function traverse(nodes: T[], parent?: T) {
    nodes.forEach((node, index) => {
      callback(node, index, parent)

      if (node[childrenKey] && node[childrenKey].length > 0) {
        traverse(node[childrenKey], node)
      }
    })
  }

  traverse(tree)
}

/**
 * 映射树节点
 * @example mapTree(tree, node => ({ ...node, label: node.name }))
 */
function mapTree<T extends Record<string, any>, R extends Record<string, any>>(
  tree: T[],
  mapper: (node: T) => R,
  options: TreeOptions = {}
): R[] {
  const { childrenKey = 'children' } = options

  function map(nodes: T[]): R[] {
    return nodes.map(node => {
      const mapped = mapper(node)

      if (node[childrenKey] && node[childrenKey].length > 0) {
        return {
          ...mapped,
          [childrenKey]: map(node[childrenKey]),
        }
      }

      return mapped
    })
  }

  return map(tree)
}

/**
 * 获取树的最大深度
 * @example getTreeDepth(tree)
 */
function getTreeDepth<T extends Record<string, any>>(
  tree: T[],
  options: TreeOptions = {}
): number {
  const { childrenKey = 'children' } = options

  function getDepth(nodes: T[]): number {
    if (!nodes || nodes.length === 0) return 0

    let maxDepth = 0

    for (const node of nodes) {
      if (node[childrenKey] && node[childrenKey].length > 0) {
        const depth = getDepth(node[childrenKey])
        maxDepth = Math.max(maxDepth, depth)
      }
    }

    return maxDepth + 1
  }

  return getDepth(tree)
}

/**
 * 获取树的所有叶子节点
 * @example getLeafNodes(tree)
 */
function getLeafNodes<T extends Record<string, any>>(
  tree: T[],
  options: TreeOptions = {}
): T[] {
  const { childrenKey = 'children' } = options
  const leaves: T[] = []

  function traverse(nodes: T[]) {
    nodes.forEach(node => {
      if (!node[childrenKey] || node[childrenKey].length === 0) {
        leaves.push(node)
      } else {
        traverse(node[childrenKey])
      }
    })
  }

  traverse(tree)
  return leaves
}

/**
 * 排序树节点
 * @example sortTree(tree, (a, b) => a.order - b.order)
 */
function sortTree<T extends Record<string, any>>(
  tree: T[],
  compareFn: (a: T, b: T) => number,
  options: TreeOptions = {}
): T[] {
  const { childrenKey = 'children' } = options

  function sort(nodes: T[]): T[] {
    const sorted = [...nodes].sort(compareFn)

    return sorted.map(node => {
      if (node[childrenKey] && node[childrenKey].length > 0) {
        return {
          ...node,
          [childrenKey]: sort(node[childrenKey]),
        }
      }
      return node
    })
  }

  return sort(tree)
}

/**
 * 查找节点的父节点
 * @example findParent(tree, node => node.id === 'child')
 */
function findParent<T extends Record<string, any>>(
  tree: T[],
  predicate: (node: T) => boolean,
  options: TreeOptions = {}
): T | null {
  const { childrenKey = 'children' } = options

  function traverse(nodes: T[], parent: T | null = null): T | null {
    for (const node of nodes) {
      if (predicate(node)) {
        return parent
      }

      if (node[childrenKey] && node[childrenKey].length > 0) {
        const found = traverse(node[childrenKey], node)
        if (found !== undefined) return found
      }
    }

    return null
  }

  return traverse(tree)
}

/**
 * 查找节点的所有祖先
 * @example findAncestors(tree, node => node.id === 'child')
 */
function findAncestors<T extends Record<string, any>>(
  tree: T[],
  predicate: (node: T) => boolean,
  options: TreeOptions = {}
): T[] {
  const path = findPath(tree, predicate, options)
  return path ? path.slice(0, -1) : []
}

/**
 * 查找节点的所有后代
 * @example findDescendants(tree, node => node.id === 'parent')
 */
function findDescendants<T extends Record<string, any>>(
  tree: T[],
  predicate: (node: T) => boolean,
  options: TreeOptions = {}
): T[] {
  const { childrenKey = 'children' } = options
  const target = findNode(tree, predicate, options)

  if (!target || !target[childrenKey]) return []

  return treeToList(target[childrenKey], options)
}

/**
 * 树节点去重
 * @example uniqueTree(tree, node => node.id)
 */
function uniqueTree<T extends Record<string, any>>(
  tree: T[],
  getKey: (node: T) => any,
  options: TreeOptions = {}
): T[] {
  const { childrenKey = 'children' } = options
  const seen = new Set()

  function unique(nodes: T[]): T[] {
    return nodes
      .filter(node => {
        const key = getKey(node)
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
      .map(node => {
        if (node[childrenKey] && node[childrenKey].length > 0) {
          return {
            ...node,
            [childrenKey]: unique(node[childrenKey]),
          }
        }
        return node
      })
  }

  return unique(tree)
}

/**
 * 扁平化树到指定深度
 * @example flattenToDepth(tree, 2)
 */
function flattenToDepth<T extends Record<string, any>>(
  tree: T[],
  depth: number,
  options: TreeOptions = {}
): T[] {
  const { childrenKey = 'children' } = options

  function flatten(nodes: T[], currentDepth: number): T[] {
    if (currentDepth >= depth) {
      return nodes.map(node => {
        const { [childrenKey]: _, ...rest } = node
        return rest as T
      })
    }

    return nodes.map(node => {
      if (node[childrenKey] && node[childrenKey].length > 0) {
        return {
          ...node,
          [childrenKey]: flatten(node[childrenKey], currentDepth + 1),
        }
      }
      return node
    })
  }

  return flatten(tree, 0)
}

const tree = {
  listToTree,
  treeToList,
  findNode,
  findPath,
  findParent,
  findAncestors,
  findDescendants,
  filterTree,
  forEachTree,
  mapTree,
  sortTree,
  getTreeDepth,
  getLeafNodes,
  uniqueTree,
  flattenToDepth,
}

export default tree
