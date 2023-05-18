import LoginWindow from './LoginWindow';
import { Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../redux/reducers/authSlice';

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const loginButtonText = auth.isLoggedIn ? 'Вийти' : 'Увійти';
  const loginButtonColor = auth.isLoggedIn ? 'danger' : 'success';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(login());
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLoginOK = async () => {
    dispatch(login());
  };

  const handleLogout = async () => {
    localStorage.removeItem('token');
    dispatch(logout());
  };

  const handleLogin = async () => {
    if (auth.isLoggedIn) {
      handleLogout();
    } else {
      setShowModal(true);
    }
  };

  return (
    <header className="border-bottom">
      <nav className="navbar navbar-light bg-light">
        <div className="d-inline-flex align-items-center m-2">
          <Link className="fw-bold fs-3 nav-link p-2 ms-3" to="/">Cafe</Link>
          <Link className="nav-link fs-5 p-2 ms-4" to="/">Меню</Link>
          {auth.isLoggedIn && <Link className="nav-link fs-5 p-2" to="/dishes">Страви</Link>}
          {auth.isLoggedIn && <Link className="nav-link fs-5 p-2" to="/providers">Постачальники</Link>}
          {auth.isLoggedIn && <Link className="nav-link fs-5 p-2" to="/sales">Продажі</Link>}
        </div>
        <div className="me-3">
          <Button type="button" className={`btn btn-${loginButtonColor}`} onClick={handleLogin}>
            {loginButtonText}
          </Button>
        </div>
        <LoginWindow show={showModal} onClose={handleCloseModal} onLogin={handleLoginOK} />
      </nav>
    </header>
  );
}

// export default function Header() {
//   const [showModal, setShowModal] = useState(false);
//   const dispatch = useDispatch();
//   const auth = useSelector((state) => state.auth);
//   const loginButtonText = auth.isLoggedIn ? 'Вийти' : 'Увійти';
//   const loginButtonColor = auth.isLoggedIn ? 'danger' : 'success';

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       dispatch(login());
//     }
//   }, []);

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const handleLoginOK = async () => {
//     dispatch(login());
//   };

//   const handleLogout = async () => {
//     localStorage.removeItem('token');
//     dispatch(logout());
//   };

//   const handleLogin = async () => {
//     if (auth.isLoggedIn) {
//       handleLogout();
//     } else {
//       setShowModal(true);
//     }
//   };

//   return (
//     <header className="border-bottom">
//       <nav className="navbar navbar-light bg-light">
//         <div className="d-inline-flex align-items-center m-2">
//           <Link className="fw-bold fs-3 nav-link p-2 ms-3" to="/">Cafe</Link>
//           <Link className="nav-link fs-5 p-2 ms-4" to="/">Меню</Link>
//           <Link className="nav-link fs-5 p-2" to="/dishes">Страви</Link>
//           <Link className="nav-link fs-5 p-2" to="/providers">Постачальники</Link>
//           <Link className="nav-link fs-5 p-2" to="/sales">Продажі</Link>
//         </div>
//         <div className="me-3">
//           <Button type="button" className={`btn btn-${loginButtonColor}`} onClick={handleLogin}>
//             {loginButtonText}
//           </Button>
//         </div>
//         <LoginWindow show={showModal} onClose={handleCloseModal} onLogin={handleLoginOK} />
//       </nav>
//     </header>
//   );
// }