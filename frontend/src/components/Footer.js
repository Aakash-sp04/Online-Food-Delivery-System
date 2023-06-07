import React from 'react'
import facebook from "../facebook.svg"
import instagram from "../instagram.svg"
import gmail from "../gmail.svg"

export default function Footer() {
  return (
    <div>
      <footer className="bottom-container bg-success">
        
        <div className='d-flex justify-content-center'>
          
          <a className="footer-link" href="mailto:aakashspachchigar@gmail.com"><img src={gmail} alt='gmail' /></a>
          <a className="footer-link" href="https://www.instagram.com/"><img src={instagram} alt='instagram' /></a>
          <a className="footer-link" href="https://www.facebook.com/"><img src={facebook} alt='facebook' /></a>
        </div>
        <p className="copyright">© 2023 fOOdie Inc.</p>

      </footer>
    </div>
  )
}
