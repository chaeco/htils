import { describe, it, expect } from 'vitest'
import tree from '../tree'

interface TreeNode {
  id: number
  parentId: number | null
  name: string
  children?: TreeNode[]
}

describe('Tree Utils', () => {
  const flatList: TreeNode[] = [
    { id: 1, parentId: null, name: 'root' },
    { id: 2, parentId: 1, name: 'child1' },
    { id: 3, parentId: 1, name: 'child2' },
    { id: 4, parentId: 2, name: 'grandchild' }
  ]

  describe('listToTree', () => {
    it('should convert flat list to tree', () => {
      const result = tree.listToTree<TreeNode>(flatList)
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe(1)
      expect(result[0].children).toHaveLength(2)
      expect(result[0].children![0].children).toHaveLength(1)
    })

    it('should handle empty list', () => {
      expect(tree.listToTree([])).toEqual([])
    })
  })

  describe('treeToList', () => {
    it('should convert tree to flat list', () => {
      const treeData = tree.listToTree<TreeNode>(flatList)
      const result = tree.treeToList<TreeNode>(treeData)
      expect(result).toHaveLength(4)
    })
  })

  describe('findNode', () => {
    it('should find node by predicate', () => {
      const treeData = tree.listToTree<TreeNode>(flatList)
      const node = tree.findNode<TreeNode>(treeData, n => n.id === 4)
      expect(node).toBeDefined()
      expect(node?.name).toBe('grandchild')
    })

    it('should return null if not found', () => {
      const treeData = tree.listToTree<TreeNode>(flatList)
      const node = tree.findNode<TreeNode>(treeData, n => n.id === 999)
      expect(node).toBeNull()
    })
  })

  describe('findPath', () => {
    it('should find path to node', () => {
      const treeData = tree.listToTree<TreeNode>(flatList)
      const path = tree.findPath<TreeNode>(treeData, n => n.id === 4)
      expect(path).toHaveLength(3) // root -> child1 -> grandchild
      expect(path?.map(n => n.id)).toEqual([1, 2, 4])
    })
  })

  describe('getTreeDepth', () => {
    it('should calculate tree depth', () => {
      const treeData = tree.listToTree<TreeNode>(flatList)
      expect(tree.getTreeDepth<TreeNode>(treeData)).toBe(3)
    })

    it('should return 0 for empty tree', () => {
      expect(tree.getTreeDepth<TreeNode>([])).toBe(0)
    })
  })

  describe('getLeafNodes', () => {
    it('should get all leaf nodes', () => {
      const treeData = tree.listToTree<TreeNode>(flatList)
      const leaves = tree.getLeafNodes<TreeNode>(treeData)
      expect(leaves).toHaveLength(2) // grandchild and child2
      expect(leaves.some(n => n.id === 4)).toBe(true)
      expect(leaves.some(n => n.id === 3)).toBe(true)
    })
  })

  describe('filterTree', () => {
    it('should filter nodes', () => {
      const treeData = tree.listToTree<TreeNode>(flatList)
      const filtered = tree.filterTree<TreeNode>(treeData, n => n.id !== 2)
      const flatFiltered = tree.treeToList<TreeNode>(filtered)
      expect(flatFiltered.some(n => n.id === 2)).toBe(false)
    })
  })
})
