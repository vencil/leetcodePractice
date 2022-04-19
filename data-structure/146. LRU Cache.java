/*
Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:

LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
int get(int key) Return the value of the key if the key exists, otherwise return -1.
void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.
The functions get and put must each run in O(1) average time complexity.

Example 1:

Input
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, null, -1, 3, 4]

Explanation
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4

Constraints:

1 <= capacity <= 3000
0 <= key <= 10^4
0 <= value <= 10^5
At most 2 * 105 calls will be made to get and put.
*/
// For real world usage, you may use the similar data structure implemented by programing language itself. ex: LinkedHashMap in java
class LRUCache {
    class DLinkNode {
        DLinkNode prev;
        DLinkNode next;
        int value;
        int key;

        public DLinkNode(int key, int value) {
            this.value = value;
            this.key = key;
        }

        void setPrev(DLinkNode prev) {
            this.prev = prev;
        }

        void setNext(DLinkNode next) {
            this.next = next;
        }

        void setValue(int value) {
            this.value = value;
        }

        DLinkNode getPrev() {
            return this.prev;
        }

        DLinkNode getNext() {
            return this.next;
        }

        int getValue() {
            return this.value;
        }

        int getKey() {
            return this.key;
        }
    }

    private DLinkNode head;
    private DLinkNode tail;
    private int size = 0;
    private int capacity = 0;
    private Map<Integer, DLinkNode> cache;

    public LRUCache(int capacity) {
        this.head = new DLinkNode(-1, 0);
        this.tail = new DLinkNode(-1, 0);
        this.head.setNext(this.tail);
        this.tail.setPrev(this.head);
        this.size = 0;
        this.capacity = capacity;
        this.cache = new HashMap<>();
    }

    public int get(int key) {
        if (this.cache.containsKey(key)) {
            DLinkNode node = this.cache.get(key);
            moveToHead(node);
            return node.getValue();
        } else {
            return -1;
        }
    }

    public void put(int key, int value) {
        if (this.cache.containsKey(key)) {
            DLinkNode node = this.cache.get(key);
            moveToHead(node);
            node.setValue(value);
        } else {
            if (this.size == this.capacity) {
                DLinkNode last = this.removeTail();
                this.cache.remove(last.getKey());
                this.size--;
            }
            this.size++;
            DLinkNode node = new DLinkNode(key, value);
            addToHead(node);
            this.cache.put(key, node);
        }
    }

    private void addToHead(DLinkNode node) {
        DLinkNode originPrev = this.head.getNext();
        this.head.setNext(node);
        node.setPrev(this.head);
        node.setNext(originPrev);
        originPrev.setPrev(node);
    }

    private void moveToHead(DLinkNode node) {
        removeNode(node);
        addToHead(node);
    }

    private DLinkNode removeNode(DLinkNode node) {
        DLinkNode prev = node.getPrev();
        DLinkNode next = node.getNext();
        prev.setNext(next);
        next.setPrev(prev);
        return node;
    }

    private DLinkNode removeTail() {
        return removeNode(this.tail.getPrev());
    }

}

/**
 * Your LRUCache object will be instantiated and called as such:
 * LRUCache obj = new LRUCache(capacity);
 * int param_1 = obj.get(key);
 * obj.put(key,value);
 */