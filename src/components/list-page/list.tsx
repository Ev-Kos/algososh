export class Node<T> {
    value: T
    next: Node<T> | null
    constructor(value: T, next?: Node<T> | null) {
      this.value = value;
      this.next = (next === undefined ? null : next);
    }
}

export interface ILinkedList<T> {
    append: (element: T) => void;
    deleteHead: () => Node<T> | null;
    insertAt: (element: T, position: number) => void;
    removeAt: (position: number) => void;
    getSize: () => number;
    print: () => void;
}

  
export class LinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | null;
    private tail: Node<T> | null;
    private size: number;
    constructor(defaultValues: T[]) {
      this.head = null;
      this.tail = null;
      this.size = 0;
      this.fromArray(defaultValues);
    }

    fromArray(defaultValues: T[]) {
        defaultValues.forEach(item => this.append(item));
        return this;
    }

    insertAt(element: T, index: number) {
        if (index < 0 || index > this.size) {
          console.log('Enter a valid index');  
          return;
        }
        const node = new Node(element);
    
        if (index === 0) {
          node.next = this.head;
          this.head = node;
        } else {
          let curr = this.head;
          let currIndex = 0;
          while (currIndex < index - 1 && curr !== null) {
            curr = curr.next;
            currIndex++;
          }
          if (curr !== null && curr.next !== null) {
            node.next = curr.next;
            curr.next = node;
          }
        }
        this.size++;
    }

    append(element: T) {
        const node = new Node(element);
        let current;
    
        if (this.head === null) {
          this.head = node;
        } else {
          current = this.head;
          while (current.next) {
            current = current.next;
          }
          current.next = node;
        }
        this.size++;
    }

    deleteHead() {
        if (!this.head) return null;
        const deletedHead = this.head;
    
        if (this.head.next) {
          this.head = this.head.next;
        } else {
          this.head = null;
          this.tail = null;
        }
        this.size--;
        return deletedHead;
    }

    removeAt(index: number) {
        if (index < 0 || index > this.size) {
            console.log('Enter a valid index');
            return;
        } else {
            let current = null;
            let previous = null;
            let currentIndex = 0;
            current = this.head;
            previous = current;
    
            if (index === 0) {
                this.deleteHead();
                return;
            } else {
                while (currentIndex < index) {
                    currentIndex++;
                    previous = current;
                    if (current) {
                        current = current.next;
                    }
                }
                if (previous) {
                    previous.next = current ? current.next : null;
                }
            }
            this.size--;
        }
    }

    getSize() {
        return this.size;
      }
    
      print() {
        let curr = this.head;
        let res = '';
        while (curr) {
          res += `${curr.value} `;
          curr = curr.next;
        }
        console.log(res);
      }
}
    