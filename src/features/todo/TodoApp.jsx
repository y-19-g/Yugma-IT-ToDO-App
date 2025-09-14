import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo, updateTodo } from './todoSlice';
import { logout } from '../user/userSlice';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Form, 
  Button, 
  Navbar, 
  Nav, 
  ProgressBar, 
  Badge, 
  ListGroup, 
  InputGroup,
  ButtonGroup
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TodoApp.css';

export function TodoApp() {
  const [todoName, setTodoName] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');

  const todos = useSelector(state => state.todos);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (todoName.trim() === '') return;
    dispatch(addTodo(todoName));
    setTodoName('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleEdit = (todo) => {
    setEditId(todo.id);
    setEditName(todo.name);
  };

  const handleSaveEdit = () => {
    if (editName.trim() === '') return;
    dispatch(updateTodo({ id: editId, newName: editName }));
    setEditId(null);
    setEditName('');
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditName('');
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="todo-app">
      {/* Header */}
      <Navbar bg="primary" variant="dark" className="todo-header">
        <Container fluid>
          <Navbar.Brand className="app-title">
            <span className="app-icon me-2">📝</span>
            TodoApp
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Navbar.Text className="user-info me-3">
              <div className="d-flex flex-column align-items-end">
                <small className="user-greeting">Welcome back,</small>
                <strong className="user-name">{user.name}</strong>
              </div>
            </Navbar.Text>
            <Button 
              variant="outline-light" 
              size="sm"
              onClick={handleLogout}
              className="btn-modern"
            >
              <span className="me-1">👋</span>
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Main Content */}
      <main className="todo-main">
        <Container fluid className="py-4">
          <Row className="justify-content-center">
            <Col lg={8} xl={6}>
              <Card className="todo-card animate-fade-in">
                {/* Progress Section */}
                <Card.Header className="progress-section">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Card.Title as="h2" className="section-title mb-0">
                      Your Tasks
                    </Card.Title>
                    <Badge bg="primary" className="progress-badge px-3 py-2">
                      {completedCount} of {totalCount} completed
                    </Badge>
                  </div>
                  <ProgressBar 
                    now={progressPercentage} 
                    className="progress-bar"
                    style={{ height: '8px' }}
                  />
                </Card.Header>

                <Card.Body className="p-0">
                  {/* Add Todo Section */}
                  <div className="add-todo-section p-4 border-bottom">
                    <InputGroup size="lg">
                      <Form.Control
                        type="text"
                        placeholder="What needs to be done?"
                        value={todoName}
                        onChange={(e) => setTodoName(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="input-modern"
                      />
                      <Button 
                        variant="primary"
                        onClick={handleAdd}
                        disabled={!todoName.trim()}
                        className="btn-modern"
                      >
                        <span className="me-1">➕</span>
                        Add Task
                      </Button>
                    </InputGroup>
                  </div>

                  {/* Todo List */}
                  <div className="todo-list" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                    {todos.length === 0 ? (
                      <div className="empty-state text-center py-5">
                        <div className="empty-icon mb-3" style={{ fontSize: '4rem' }}>🎯</div>
                        <h3>No tasks yet!</h3>
                        <p className="text-muted">Add your first task above to get started.</p>
                      </div>
                    ) : (
                      <ListGroup variant="flush">
                        {todos.map(todo => (
                          <ListGroup.Item 
                            key={todo.id} 
                            className={`todo-item ${todo.completed ? 'completed' : ''}`}
                            style={{ border: 'none', padding: '1rem' }}
                          >
                            {editId === todo.id ? (
                              <div className="edit-mode d-flex gap-2">
                                <Form.Control
                                  type="text"
                                  value={editName}
                                  onChange={(e) => setEditName(e.target.value)}
                                  onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                                  className="input-modern"
                                  autoFocus
                                />
                                <ButtonGroup>
                                  <Button 
                                    variant="success"
                                    size="sm"
                                    onClick={handleSaveEdit}
                                    disabled={!editName.trim()}
                                    className="btn-modern"
                                  >
                                    <span className="me-1">✓</span>
                                    Save
                                  </Button>
                                  <Button 
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={handleCancelEdit}
                                    className="btn-modern"
                                  >
                                    <span className="me-1">✕</span>
                                    Cancel
                                  </Button>
                                </ButtonGroup>
                              </div>
                            ) : (
                              <div className="todo-content d-flex justify-content-between align-items-center">
                                <div 
                                  className={`todo-text d-flex align-items-center ${todo.completed ? 'completed' : ''}`}
                                  onClick={() => dispatch(toggleTodo(todo.id))}
                                  style={{ cursor: 'pointer', flex: 1 }}
                                >
                                  <div className="todo-checkbox me-3" style={{ fontSize: '1.2rem' }}>
                                    {todo.completed ? '✅' : '⭕'}
                                  </div>
                                  <span className={`todo-name ${todo.completed ? 'text-decoration-line-through text-muted' : ''}`}>
                                    {todo.name}
                                  </span>
                                </div>
                                <ButtonGroup size="sm">
                                  <Button
                                    variant="outline-warning"
                                    onClick={() => handleEdit(todo)}
                                    title="Edit task"
                                    className="btn-modern"
                                  >
                                    ✏️
                                  </Button>
                                  <Button
                                    variant="outline-danger"
                                    onClick={() => dispatch(deleteTodo(todo.id))}
                                    title="Delete task"
                                    className="btn-modern"
                                  >
                                    🗑️
                                  </Button>
                                </ButtonGroup>
                              </div>
                            )}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}