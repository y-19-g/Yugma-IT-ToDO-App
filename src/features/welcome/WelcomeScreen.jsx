import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../user/userSlice';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Form, 
  Button, 
  Alert, 
  Spinner,
  Badge,
  Stack
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './WelcomeScreen.css';

export function WelcomeScreen() {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() === '') {
      setError('Please enter your name');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate a brief loading state for better UX
    setTimeout(() => {
      dispatch(setUser(name.trim()));
      setIsLoading(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="modern-welcome-screen">
      {/* Background Elements */}
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <Container className="h-100 d-flex align-items-center justify-content-center">
        <Row className="justify-content-center w-100">
          <Col lg={8} xl={6}>
            <div className="welcome-container">
              {/* Header Section */}
              <div className="welcome-header text-center mb-5">
                <div className="brand-section">
                  <div className="brand-logo">
                    <div className="logo-icon">✓</div>
                  </div>
                  <h1 className="brand-title">TaskFlow</h1>
                  <p className="brand-subtitle">A Modern Todo App Demo</p>
                </div>
              </div>

              {/* Main Login Card */}
              <Card className="login-card">
                <Card.Body className="p-5">
                  <div className="login-header text-center mb-4">
                    <h2 className="login-title">Try the Demo!</h2>
                    <p className="login-subtitle">Enter your name to explore the Todo app features</p>
                  </div>

                  <Form onSubmit={handleSubmit} className="login-form">
                    <Form.Group className="mb-4">
                      <Form.Label className="form-label">Your Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter any name to try the demo"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setError('');
                        }}
                        onKeyPress={handleKeyPress}
                        className="modern-input"
                        autoFocus
                        required
                        isInvalid={!!error}
                      />
                      {error && (
                        <Form.Control.Feedback type="invalid">
                          {error}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                    
                    <Button 
                      type="submit" 
                      variant="success"
                      size="lg"
                      className="w-100 login-btn"
                      disabled={!name.trim() || isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          Loading Demo...
                        </>
                      ) : (
                        <>
                          <span className="me-2">🚀</span>
                          Try Demo
                        </>
                      )}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>

              {/* Features Section */}
              <div className="features-section mt-5">
                <h3 className="features-title text-center mb-4">Demo Features</h3>
                <Row className="g-4">
                  <Col md={4}>
                    <div className="feature-card">
                      <div className="feature-icon">
                        <span>📝</span>
                      </div>
                      <h4 className="feature-title">Redux Thunks & API</h4>
                      <p className="feature-description">
                        Demonstrates async operations with Redux Toolkit and API integration
                      </p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="feature-card">
                      <div className="feature-icon">
                        <span>📊</span>
                      </div>
                      <h4 className="feature-title">Modern UI Design</h4>
                      <p className="feature-description">
                        Built with React Bootstrap and modern CSS for a sleek user experience
                      </p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="feature-card">
                      <div className="feature-icon">
                        <span>⚡</span>
                      </div>
                      <h4 className="feature-title">Loading States</h4>
                      <p className="feature-description">
                        Shows proper loading indicators and error handling for better UX
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>

              {/* Tech Stack Section */}
              <div className="stats-section mt-5">
                <h4 className="text-center mb-4" style={{color: 'var(--gray-700)', fontWeight: '600'}}>Built With</h4>
                <Row className="g-3">
                  <Col xs={4}>
                    <div className="stat-item text-center">
                      <div className="stat-number">React</div>
                      <div className="stat-label">Frontend</div>
                    </div>
                  </Col>
                  <Col xs={4}>
                    <div className="stat-item text-center">
                      <div className="stat-number">Redux</div>
                      <div className="stat-label">State Management</div>
                    </div>
                  </Col>
                  <Col xs={4}>
                    <div className="stat-item text-center">
                      <div className="stat-number">Bootstrap</div>
                      <div className="stat-label">UI Framework</div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}