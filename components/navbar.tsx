import { LogoutOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signout } from '../lib/services/user.service'

export default function Navbar(): JSX.Element {
  const router = useRouter()
  const path = router.pathname

  const shouldHide = ['/login', '/'].includes(path)
  const isSeach = ['/dashboard', '/details'].includes(path)
  const isMe = ['/me'].includes(path)

  const className = 'px-1.5 md:px-5 my-auto font-semibold'

  function logout(): void {
    signout()
    router.push('/')
  }

  return (
    <nav className='sticky w-full h-20'>
      <div data-testid='container' className='flex p-5 h-20'>
        <div>A</div>
        <div className='grow'></div>
        {!shouldHide && (
          <ul className='flex list-none h-8'>
            <li
              className={`${className} ${isSeach ? 'text-green-spotify' : ''}`}
            >
              <Link href='/dashboard'>Buscar</Link>
            </li>
            <li className={`${className} ${isMe ? 'text-green-spotify' : ''}`}>
              <Link href='/me'>My Albums</Link>
            </li>
            <li
              data-testid='logout'
              className='px-4 border-white border-x mx-1.5 my-auto md:mx-5  md:px-10 font-semibold hover:cursor-pointer'
              onClick={logout}
            >
              <span className='hidden md:inline'>Cerrar sesion</span>
              <LogoutOutlined className='md:hidden text-xl' />
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}
