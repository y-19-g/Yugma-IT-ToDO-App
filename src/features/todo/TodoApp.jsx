import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchTodos, 
  addTodoAsync, 
  toggleTodoAsync, 
  deleteTodoAsync, 
  updateTodoAsync,
  clearError 
} from './todoSlice';
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
  ButtonGroup,
  Alert,
  Spinner,
  Offcanvas,
  Stack
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TodoApp.css';

export function TodoApp() {
  const [todoName, setTodoName] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);

  const { items: todos, loading, error, operationLoading } = useSelector(state => state.todos);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  // Fetch todos on component mount
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleAdd = () => {
    if (todoName.trim() === '') return;
    dispatch(addTodoAsync(todoName));
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
    dispatch(updateTodoAsync({ id: editId, newName: editName }));
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
    <div className="modern-todo-app">
      {/* Modern Header */}
      <Navbar expand="lg" className="modern-navbar">
        <Container>
          <Navbar.Brand className="modern-brand">
            <div className="brand-icon">✓</div>
            <span className="brand-text">TaskFlow</span>
          </Navbar.Brand>
          
          <Navbar.Toggle 
            aria-controls="basic-navbar-nav" 
            onClick={() => setShowSidebar(!showSidebar)}
            className="modern-toggle"
          />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <div className="user-profile">
                <div className="user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="user-details">
                  <div className="user-name">{user.name}</div>
                  <div className="user-status">Demo User</div>
                </div>
                <Button 
                  variant="outline-light" 
                  size="sm"
                  onClick={handleLogout}
                  className="logout-btn"
                >
                  Logout
                </Button>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <main className="main-content">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto">
              {/* Error Alert */}
              {error && (
                <Alert 
                  variant="danger" 
                  dismissible 
                  onClose={() => dispatch(clearError())}
                  className="modern-alert"
                >
                  <div className="alert-content">
                    <div className="alert-icon">⚠️</div>
                    <div>
                      <Alert.Heading>Something went wrong</Alert.Heading>
                      <p className="mb-0">{error}</p>
                    </div>
                  </div>
                </Alert>
              )}

              {/* Stats Cards */}
              <Row className="mb-4">
                <Col md={4}>
                  <Card className="stat-card">
                    <Card.Body className="text-center">
                      <div className="stat-number">{totalCount}</div>
                      <div className="stat-label">Total Tasks</div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="stat-card">
                    <Card.Body className="text-center">
                      <div className="stat-number">{completedCount}</div>
                      <div className="stat-label">Completed</div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="stat-card">
                    <Card.Body className="text-center">
                      <div className="stat-number">{totalCount - completedCount}</div>
                      <div className="stat-label">Remaining</div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Progress Section */}
              <Card className="progress-card mb-4">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="progress-title mb-0">Progress Overview</h5>
                    <Badge className="progress-badge">
                      {Math.round(progressPercentage)}% Complete
                    </Badge>
                  </div>
                  <ProgressBar 
                    now={progressPercentage} 
                    className="modern-progress"
                    variant="success"
                  />
                </Card.Body>
              </Card>

              {/* Add Task Section */}
              <Card className="add-task-card mb-4">
                <Card.Body>
                  <h5 className="card-title mb-3">Add New Task</h5>
                  <InputGroup size="lg">
                    <Form.Control
                      type="text"
                      placeholder="What needs to be done today?"
                      value={todoName}
                      onChange={(e) => setTodoName(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="modern-input"
                    />
                    <Button 
                      variant="success"
                      onClick={handleAdd}
                      disabled={!todoName.trim() || operationLoading.add}
                      className="add-btn"
                    >
                      {operationLoading.add ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        <>
                          <span className="me-2">+</span>
                          Add Task
                        </>
                      )}
                    </Button>
                  </InputGroup>
                </Card.Body>
              </Card>

              {/* Tasks List */}
              <Card className="tasks-card">
                <Card.Header className="tasks-header">
                  <h5 className="mb-0">Your Tasks</h5>
                </Card.Header>
                <Card.Body className="p-0">
                  {loading ? (
                    <div className="loading-container">
                      <Spinner animation="border" variant="primary" />
                      <p className="mt-3">Loading your tasks...</p>
                    </div>
                  ) : todos.length === 0 ? (
                    <div className="empty-container">
                      <div className="empty-icon">📋</div>
                      <h4>No tasks yet!</h4>
                      <p>Add your first task above to get started.</p>
                    </div>
                  ) : (
                    <div className="tasks-list">
                      {todos.map(todo => (
                        <div 
                          key={todo.id} 
                          className={`task-item ${todo.completed ? 'completed' : ''}`}
                        >
                          {editId === todo.id ? (
                            <div className="edit-container">
                              <Form.Control
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                                className="edit-input"
                                autoFocus
                              />
                              <ButtonGroup>
                                <Button 
                                  variant="success"
                                  size="sm"
                                  onClick={handleSaveEdit}
                                  disabled={!editName.trim() || operationLoading.update}
                                >
                                  {operationLoading.update ? (
                                    <Spinner animation="border" size="sm" />
                                  ) : (
                                    'Save'
                                  )}
                                </Button>
                                <Button 
                                  variant="outline-secondary"
                                  size="sm"
                                  onClick={handleCancelEdit}
                                >
                                  Cancel
                                </Button>
                              </ButtonGroup>
                            </div>
                          ) : (
                            <div className="task-content">
                              <div 
                                className="task-checkbox"
                                onClick={() => dispatch(toggleTodoAsync({ id: todo.id, completed: !todo.completed }))}
                              >
                                {operationLoading.toggle ? (
                                  <Spinner animation="border" size="sm" />
                                ) : (
                                  <div className={`checkbox ${todo.completed ? 'checked' : ''}`}>
                                    {todo.completed && '✓'}
                                  </div>
                                )}
                              </div>
                              <div 
                                className={`task-text ${todo.completed ? 'completed' : ''}`}
                                onClick={() => dispatch(toggleTodoAsync({ id: todo.id, completed: !todo.completed }))}
                              >
                                {todo.name}
                              </div>
                              <div className="task-actions">
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  onClick={() => handleEdit(todo)}
                                  className="action-btn"
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => dispatch(deleteTodoAsync(todo.id))}
                                  disabled={operationLoading.delete}
                                  className="action-btn"
                                >
                                  {operationLoading.delete ? (
                                    <Spinner animation="border" size="sm" />
                                  ) : (
                                    'Delete'
                                  )}
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}