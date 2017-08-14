/**
 * Created by thanhhuyen on 7/23/17.
 */
let BLANK = 0;
let WALL = 1;
let SNAKE = 2;
let VISITED = 3;
const _walls = [
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
];
var _cols = 9;
var _rows = 9;
const _start = {x: 1, y: 3};
const _goal = {x: 0, y: 5};
var _bfs;

//----------------------------Dinh nghia doi tuong queue voi cac phuong thuc ben trong------------------
function Queue() {
    let data = [];
    this.clear = function () {
        data.lenght = 0;
    }
    this.getLength = function () {
        return data.length;
    }
    this.isEmpty = function () {
        return data.length === 0;
    }
    this.enqueue = function (item) {
        data.push(item);
    }
    this.dequeue = function () {
        if (data.length === 0) return undefined;
        return data.shift();
    }
    this.peek = function () {
        return (data.length > 0 ? data[0] : undefined);
    }
}

//---------------------------------------ket thuc dinh nghia doi tuong queue--------------------
//---------------------------------------Dinh nghia doi tuong Node------------------------------
function Node(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;
}

//---------------------------------------Ket thuc----------------------------------------------
//--------------Dinh nghia phuong thuc Breadth voi cac phuong thuc ben trong no----------------
function BreadthFirstSearch(walls, cols, rows) {
    var open = new Queue();
    let nodes = [];
    //Khoi tao 1 mang cac doi tuong node
    for (let i = 0; i < cols; i++) {
        nodes[i] = [];
        for (let j = 0; j < rows; j++) {
            nodes[i][j] = new Node(i, j, walls[i][j])
        }
    }
    this.test = function () {
        return nodes;
    }
    this.FindPath = function (start, goal) {
        let node;
        open = new Queue();
        open.enqueue(start);
        while (!open.isEmpty()) {
            node = open.dequeue();
            if (node) {
                if (node.x == goal.x && node.y == goal.y) {
                    return getSol(node);
                }
                genMove(node);
            }
            else
                break;
        }
        return null
    }

    function genMove(node) {
        if (node.x < cols - 1) {
            addToOpen(node.x + 1, node.y, node);
        }
        if (node.y < rows - 1) {
            addToOpen(node.x, node.y + 1, node);
        }
        if (node.x > 0) {
            addToOpen(node.x - 1, node.y, node);
        }
        if (node.y > 0) {
            addToOpen(node.x, node.y - 1, node)
        }
    }

    function addToOpen(x, y, previous) {
        var node = nodes[x][y];
        if (node.value === BLANK) {
            node.value = VISITED;
            node.previous = previous;
            open.enqueue(node);
        }
    }

    function getSol(p) {
        var nodes = [];
        nodes.push(p);
        while (p.previous) {
            nodes.push(p.previous);
            p = p.previous;
        }
        return nodes;
    }
}

//------------------------Ket thuc dinh nghia doi tuong Breadth--------------------


_bfs = new BreadthFirstSearch(_walls, _cols, _rows);
//console.log('test:',_bfs.test())
console.log('duong di la:', _bfs.FindPath(_start, _goal));
