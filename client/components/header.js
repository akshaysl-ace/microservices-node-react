import Link from 'next/link';

export default ({ currentUser }) => {

    const links = [
        !currentUser && { label: 'Sign Up', address: '/auth/signup' },
        !currentUser && { label: 'Sign In', address: '/auth/signin' },
        currentUser && { label: 'Sign Out', address: '/auth/signout' },

    ].filter(link => link).map(({ label, address }) => {
        return <li key={address} className="nav-item">
            <Link href={address}>
                <a className="nav-link">{label}</a>
            </Link>
        </li>
    });


    return (
        <nav className="navbar navbar-light bg-light">
            <Link href="/">
                <a className='navbar-brand'>GiT-Tix</a>
            </Link>
            <div className="d-flex justify-content-end">
                <ul className="nav d-flex align-items-center">
                    {links}
                </ul>
            </div>
        </nav>
    )
}