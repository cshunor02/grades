import FadeIn from 'react-fade-in';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    
    const goto = useNavigate()

    function go(where)
    {
        goto(where)
    }

    return (
        <FadeIn>
            <div className='buttons'>
                <button onClick={() => go('adatbea')}>Adatbázisok II.<br />Ea</button>
                <button onClick={() => go('adatbgy')}>Adatbázisok II.<br />GY</button>
                <button onClick={() => go('konk')}>Konkurrens programozás<br />Ea+GY</button>
                <button onClick={() => go('ai')}>Mesterséges intelligencia<br />Ea+GY</button>
                <button onClick={() => go('nummod')}>Numerikus módszerek II.<br />Ea+GY</button>
                <button onClick={() => go('szamea')}>Számításelmélet<br />Ea</button>
                <button onClick={() => go('szamgy')}>Számításelmélet<br />GY</button>
                <button onClick={() => go('telea')}>Telekom<br />Ea</button>
                <button onClick={() => go('telegy')}>Telekom<br />GY</button>
                <button onClick={() => go('tipgy')}>Típuselmélet<br />GY</button>
                <button onClick={() => go('summa')}>ÖSSZEGZÉS</button>
            </div>
            <hr />
        </FadeIn>
    )
}

export default Navbar;