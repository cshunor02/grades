
import './App.css'
import Subject from './view/Subject'
import FadeIn from 'react-fade-in'
import Layout from './view/Layout'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Summa from './view/Summa'

function App() {

    const links = ['adatbea', 'adatbgy', 'konk', 'ai', 'nummod', 'szamea', 'szamgy', 
                   'telea', 'telegy', 'tipgy', 'summa']

    const elems = []
    const obj = {
        id : generateUniqueId(),
        shortDef : '',
        name : '',
        grades : [],
	    points : {
		    grade : 1,
		    format : '%' / 'P',
		    lower : [50, 60, 70, 80],
		    upper : [59, 69, 79, 100],
            wishedGrade : 5
	    },
        statistics : {
            tasks : 0,
            homeworks : 0,
            ZH : 0,
            others : 0
        }, 
	    credit : 4,
        comment : ''
    }

    function generateUniqueId() {
        return Math.random().toString(36).substr(2, 9)
    }

    for(let i = 0; i < links.length; i++)
    {
        //localStorage.removeItem(links[i])
        var elem = localStorage.getItem(links[i])
        if (elem === null)
        {
            localStorage.setItem(links[i], JSON.stringify({...obj, id : generateUniqueId(), shortDef : links[i]}))
            elem = localStorage.getItem(links[i])
        }
        elems[i] = elem
    }

    return (
        <FadeIn>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Summa name={links[10]} links={links}/>} />
                    <Route path="adatbea" element={<Subject name={links[0]} data={elems[0]} />} />
                    <Route path="adatbgy" element={<Subject name={links[1]} data={elems[1]} />} />
                    <Route path="konk" element={<Subject name={links[2]} data={elems[2]} />} />
                    <Route path="ai" element={<Subject name={links[3]} data={elems[3]} />} />
                    <Route path="nummod" element={<Subject name={links[4]} data={elems[4]} />} />
                    <Route path="szamea" element={<Subject name={links[5]} data={elems[5]} />} />
                    <Route path="szamgy" element={<Subject name={links[6]} data={elems[6]} />} />
                    <Route path="telea" element={<Subject name={links[7]} data={elems[7]} />} />
                    <Route path="telegy" element={<Subject name={links[8]} data={elems[8]} />} />
                    <Route path="tipgy" element={<Subject name={links[9]} data={elems[9]} />} />
                    <Route path="summa" element={<Summa name={links[10]} links={links}/>} />
                    <Route path="*" element={<Navigate to="/" />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </FadeIn>

  )
}

export default App
