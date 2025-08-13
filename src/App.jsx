import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, ListGroup, Dropdown, Navbar, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import logo from './assets/ShehriyarDev-01.png'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [currentTheme, setCurrentTheme] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const colorThemes = [
    { name: 'Orange Sunset', primary: '#ff9a56', secondary: '#ffad56', tertiary: '#ffc356', icon: 'sun' },
    { name: 'Pink Blossom', primary: '#ff6b9d', secondary: '#ff8fab', tertiary: '#ffb3c1', icon: 'heart' },
    { name: 'Purple Dream', primary: '#6c5ce7', secondary: '#a29bfe', tertiary: '#ddd6fe', icon: 'star' },
    { name: 'Ocean Teal', primary: '#00b894', secondary: '#00cec9', tertiary: '#81ecec', icon: 'water' },
    { name: 'Sky Blue', primary: '#0984e3', secondary: '#74b9ff', tertiary: '#a4c8ff', icon: 'cloud' },
    { name: 'Coral Reef', primary: '#e17055', secondary: '#fab1a0', tertiary: '#ffeaa7', icon: 'flower1' },
    { name: 'Forest Green', primary: '#00b894', secondary: '#55efc4', tertiary: '#a7f3d0', icon: 'tree' },
    { name: 'Sunset Glow', primary: '#fd79a8', secondary: '#fdcb6e', tertiary: '#e84393', icon: 'brightness-high' },
    { name: 'Rainbow', primary: '#6c5ce7', secondary: '#fd79a8', tertiary: '#fdcb6e', icon: 'rainbow' },
    { name: 'Dark Mode', primary: '#2d3436', secondary: '#636e72', tertiary: '#b2bec3', icon: 'moon' },
    { name: 'Rose Gold', primary: '#e84393', secondary: '#fd79a8', tertiary: '#fdcb6e', icon: 'gem' },
    { name: 'Mint Fresh', primary: '#00cec9', secondary: '#55efc4', tertiary: '#81ecec', icon: 'droplet' }
  ]

  const addTodo = () => {
    const trimmedInput = input.trim()
    if (trimmedInput) {
      if (todos.some(todo => todo.text.toLowerCase() === trimmedInput.toLowerCase())) {
        toast.error('This todo already exists!', {
          position: 'top-center',
          autoClose: 2000,
          style: {
            background: `linear-gradient(45deg, ${colorThemes[currentTheme].primary}, ${colorThemes[currentTheme].secondary})`,
            color: 'white'
          }
        })
        return
      }
      setTodos([...todos, { 
        id: Date.now(), 
        text: trimmedInput, 
        completed: false
      }])
      setInput('')
      toast.success('Todo added successfully!', {
        position: 'top-center',
        autoClose: 1500,
        style: {
          background: `linear-gradient(45deg, ${colorThemes[currentTheme].primary}, ${colorThemes[currentTheme].secondary})`,
          color: 'white'
        }
      })
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
    toast.success('Todo deleted successfully!', {
      position: 'top-center',
      autoClose: 1500,
      style: {
        background: `linear-gradient(45deg, ${colorThemes[currentTheme].primary}, ${colorThemes[currentTheme].secondary})`,
        color: 'white'
      }
    })
  }

  if (loading) {
    return (
      <div className="preloader">
        <div className="preloader-content">
          <img src={logo} alt="ShehriyarDev Logo" className="preloader-logo" />
          <h2 className="preloader-title">ShehriyarDev</h2>
          <p className="preloader-subtitle">Loading your tasks...</p>
          <div className="preloader-spinner"></div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="app-container" 
      style={{
        '--primary-color': colorThemes[currentTheme].primary,
        '--secondary-color': colorThemes[currentTheme].secondary,
        '--tertiary-color': colorThemes[currentTheme].tertiary
      }}
    >
      {/* Navbar */}
      <Navbar className="custom-navbar" expand="lg">
        <Container>
          <Navbar.Brand className="d-flex align-items-center">
            <img
              src={logo}
              width="40"
              height="40"
              className="navbar-logo me-3"
              alt="ShehriyarDev Logo"
            />
            <div>
              <h4 className="brand-name mb-0">ShehriyarDev</h4>
              <small className="brand-subtitle">Professional Todo Management</small>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" className="custom-toggler" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              <div className="navbar-stats-wrapper d-flex align-items-center flex-column flex-lg-row">
                <div className="navbar-stats me-lg-3 mb-2 mb-lg-0">
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip>Number of completed tasks</Tooltip>}
                  >
                    <span className="stats-item me-2">
                      <i className="bi bi-check-circle me-1"></i>
                      {todos.filter(todo => todo.completed).length} Completed
                    </span>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip>Total number of tasks</Tooltip>}
                  >
                    <span className="stats-item">
                      <i className="bi bi-list-task me-1"></i>
                      {todos.length} Total
                    </span>
                  </OverlayTrigger>
                </div>
                <Dropdown>
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip>Change app theme</Tooltip>}
                  >
                    <Dropdown.Toggle className="theme-toggle-navbar">
                      <i className={`bi bi-${colorThemes[currentTheme].icon} me-2`}></i>
                      Themes
                    </Dropdown.Toggle>
                  </OverlayTrigger>
                  <Dropdown.Menu className="theme-menu">
                    {colorThemes.map((theme, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() => {
                          setCurrentTheme(index)
                          toast.info(`Theme changed to ${theme.name}!`, {
                            position: 'top-center',
                            autoClose: 1000,
                            style: {
                              background: `linear-gradient(45deg, ${theme.primary}, ${theme.secondary})`,
                              color: 'white'
                            }
                          })
                        }}
                        className={`theme-item d-flex align-items-center mb-1 ${currentTheme === index ? 'active' : ''}`}
                        style={{
                          background: currentTheme === index ? `linear-gradient(45deg, ${theme.primary}30, ${theme.secondary}30)` : 'transparent',
                          border: currentTheme === index ? `2px solid ${theme.primary}` : '2px solid transparent',
                          color: 'white'
                        }}
                      >
                        <div
                          className="theme-color-preview"
                          style={{
                            background: `linear-gradient(45deg, ${theme.primary}, ${theme.secondary})`
                          }}
                        />
                        <span className={currentTheme === index ? 'fw-bold' : ''}>
                          <i className={`bi bi-${theme.icon} me-2`}></i>
                          {theme.name}
                        </span>
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="light"
      />
      {/* Main Content */}
      <Container className="main-content">
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <div className="hero-section text-center mb-5">
              <h1 className="hero-title">
                <i className="bi bi-rocket-takeoff me-3"></i>
                Organize Your Life
              </h1>
              <p className="hero-description">Stay productive and never miss a task with our beautiful todo manager</p>
            </div>
            
            <div className="todo-container">
              <div className="container-header text-center mb-4">
                <h2 className="section-title">
                  <i className="bi bi-list-check me-2"></i>
                  My Tasks
                </h2>
                <p className="section-subtitle">Add, manage, and complete your daily tasks</p>
              </div>
              
              <div className="add-todo-section mb-5">
                <Form>
                  <Form.Group className="input-group-custom">
                    <div className="input-wrapper">
                      <i className="bi bi-plus-circle input-icon"></i>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Type your task and press Enter or click Add Task</Tooltip>}
                      >
                        <Form.Control
                          className="todo-input"
                          type="text"
                          placeholder="What needs to be done today?"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTodo())}
                        />
                      </OverlayTrigger>
                    </div>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Add new task to your list</Tooltip>}
                    >
                      <Button 
                        onClick={addTodo} 
                        className="add-btn"
                      >
                        <i className="bi bi-plus-lg me-2"></i>
                        Add Task
                      </Button>
                    </OverlayTrigger>
                  </Form.Group>
                </Form>
              </div>

              <div className="todos-section">
                {todos.length > 0 && (
                  <div className="todos-header mb-3">
                    <h5 className="todos-title">
                      <i className="bi bi-list-ul me-2"></i>
                      Your Tasks ({todos.length})
                    </h5>
                  </div>
                )}
                
                <div className="todos-list">
                  {todos.map((todo, index) => (
                    <div 
                      key={todo.id} 
                      className="todo-item-modern"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="todo-content">
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip>{todo.completed ? "Mark as incomplete" : "Mark as complete"}</Tooltip>}
                        >
                          <Form.Check
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                            className="todo-checkbox me-3"
                          />
                        </OverlayTrigger>
                        <div className="todo-number">
                          #{index + 1}
                        </div>
                        <div className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                          {todo.text}
                        </div>
                      </div>
                      <div className="todo-actions">
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip>Delete task</Tooltip>}
                        >
                          <Button 
                            variant="outline-danger" 
                            size="sm" 
                            className="delete-btn-modern"
                            onClick={() => deleteTodo(todo.id)}
                          >
                            <i className="bi bi-trash3"></i>
                          </Button>
                        </OverlayTrigger>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {todos.length === 0 && (
                <div className="empty-state text-center mt-5">
                  <div className="empty-illustration">
                    <i className="bi bi-clipboard-check empty-icon"></i>
                  </div>
                  <h4 className="empty-title">Ready to be productive?</h4>
                  <p className="empty-description">Add your first task above and start organizing your day!</p>
                  <div className="empty-features">
                    <span className="feature-badge">
                      <i className="bi bi-lightning me-1"></i>
                      Fast & Easy
                    </span>
                    <span className="feature-badge">
                      <i className="bi bi-palette me-1"></i>
                      Beautiful Themes
                    </span>
                    <span className="feature-badge">
                      <i className="bi bi-check-circle me-1"></i>
                      Stay Organized
                    </span>
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      
      {/* Footer */}
      <footer className="app-footer mt-5">
        <Container>
          <Row>
            <Col md={6} className="text-center text-md-start">
              <div className="footer-brand d-flex align-items-center justify-content-center justify-content-md-start mb-3 mb-md-0">
                <img src={logo} width="30" height="30" className="me-2" alt="Logo" />
                <span className="footer-text">ShehriyarDev Todo</span>
              </div>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <div className="footer-links">
                <span className="footer-text me-3">
                  <i className="bi bi-heart-fill me-1"></i>
                  Made with Love
                </span>
                <span className="footer-text">
                  <i className="bi bi-calendar me-1"></i>
                  {new Date().getFullYear()}
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  )
}

export default App