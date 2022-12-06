from flask import Flask, request, json
from enum import Enum
from dataclasses import dataclass
import time
from flask_cors import CORS, cross_origin
api = Flask(__name__)
cors = CORS(api)
api.config['CORS_HEADERS'] = 'Content-Type'


@dataclass
class Todo:
    def __init__(self, id=-1, title=None, desc=None, priority=None, status=None, completionTime=None, creationTime=int(time.time())):
        self.id = id
        self.title = title
        self.desc = desc
        self.priority = priority
        self.status = status
        self.completionTime = completionTime
        self.creationTime = creationTime
    id: int
    title: str
    desc: str
    priority: int
    status: int
    completionTime: int
    creationTime: int


class Priority(Enum):
    High: 1
    Medium: 2
    Low: 3


class Status(Enum):
    Todo: 1
    Completed: 2


data = [Todo(1, "Push code to git", None, 1, 2, 1667996730, 1667906730),
        Todo(2, "Meeting with Gigi", "We have to discuss about yesterday's football match", 3, 1, None, 1668072330)]

curr_id = 3


@api.route('/getTodos', methods=['GET'])
def get_todos():
    print("Fetching all todos")
    return json.dumps(data)


@api.route('/addTodo', methods=['POST'])
def add_todo():
    global curr_id
    body = json.loads(request.data)
    body["id"] = curr_id
    body["status"] = 1
    curr_id += 1
    todo = Todo(**body)
    data.append(todo)
    print("TODO added")
    return json.dumps({"success": True}), 201


@api.route('/updateTodo/<id>', methods=['POST'])
def update_todo(id=None):
    body = json.loads(request.data)
    updTodo = Todo(**body)
    success = False
    for i in range(len(data)):
        curr = data[i]
        if curr.id is int(id):
            if updTodo.title is not None:
                curr.title = updTodo.title
            if updTodo.desc is not None:
                curr.desc = updTodo.desc
            if updTodo.priority is not None:
                curr.priority = updTodo.priority
            if updTodo.status is not None:
                curr.status = updTodo.status
            if updTodo.completionTime is not None:
                curr.completionTime = updTodo.completionTime
            success = True
            print("Update completed")
    return json.dumps({"success": success}), 200


@api.route('/deleteTodo/<id>', methods=['DELETE'])
def delete_todo(id=None):
    for i in range(len(data)):
        if data[i].id is int(id):
            data.pop(i)
            print("Delete completed")
            return json.dumps({"success": True}), 200
    return json.dumps({"success": False}), 200


if __name__ == '__main__':
    api.run()
