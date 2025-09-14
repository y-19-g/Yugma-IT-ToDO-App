import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../user/userSlice';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
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
    <div className="welcome-screen">
      <Container className="h-100 d-flex align-items-center justify-content-center">
        <Row className="justify-content-center w-100">
          <Col md={6} lg={5} xl={4}>
            <Card className="welcome-card animate-slide-up">
              <Card.Body className="p-5 text-center">
                <div className="welcome-header mb-4">
                  <div className="welcome-icon mb-3">
                    <span className="icon-emoji">✨</span>
                  </div>
                  <Card.Title as="h1" className="welcome-title text-gradient mb-3">
                    Welcome to TodoApp
                  </Card.Title>
                  <Card.Text className="welcome-subtitle text-muted">
                    Organize your life, one task at a time
                  </Card.Text>
                </div>

                <Form onSubmit={handleSubmit} className="welcome-form">
                  <Form.Group className="mb-4">
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setError('');
                      }}
                      onKeyPress={handleKeyPress}
                      className="input-modern"
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
                    variant="primary"
                    size="lg"
                    className="w-100 btn-modern"
                    disabled={!name.trim() || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Getting Started...
                      </>
                    ) : (
                      <>
                        <span className="me-2">🚀</span>
                        Start Todoing
                      </>
                    )}
                  </Button>
                </Form>

                <div className="welcome-features mt-4 pt-3 border-top">
                  <Row className="g-3">
                    <Col xs={12} className="d-flex align-items-center justify-content-center">
                      <div className="feature-item">
                        <span className="feature-icon me-2">📝</span>
                        <span>Create & manage tasks</span>
                      </div>
                    </Col>
                    <Col xs={12} className="d-flex align-items-center justify-content-center">
                      <div className="feature-item">
                        <span className="feature-icon me-2">✅</span>
                        <span>Track your progress</span>
                      </div>
                    </Col>
                    <Col xs={12} className="d-flex align-items-center justify-content-center">
                      <div className="feature-item">
                        <span className="feature-icon me-2">🎯</span>
                        <span>Stay organized</span>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}