import { useEffect, useState } from 'react';
import FadeIn from 'react-fade-in';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { FaCheck, FaPencilAlt, FaHandPointLeft } from 'react-icons/fa';

function Subject({name, data}) {

    switch(name)
    {
        case 'adatbea':
            document.body.style.backgroundColor = "rgba(1,200,55,0.1)"
            break
        case 'adatbgy':
            document.body.style.backgroundColor = "rgba(0, 174, 3, 0.224)"
            break
        case 'konk':
            document.body.style.backgroundColor = "rgba(170, 162, 0, 0.3)"
            break
        case 'ai':
            document.body.style.backgroundColor = "rgba(64, 0, 174, 0.224)"
            break
        case 'nummod':
            document.body.style.backgroundColor = "rgba(174, 43, 0, 0.224)"
            break
        case 'szamea':
            document.body.style.backgroundColor = "rgba(0, 174, 154, 0.224)"
            break
        case 'szamgy':
            document.body.style.backgroundColor = "rgba(0, 124, 184, 0.224)"
            break
        case 'telea':
            document.body.style.backgroundColor = "rgba(226, 0, 116, 0.4)"
            break
        case 'telegy':
            document.body.style.backgroundColor = "rgba(226, 0, 116, 0.5)"
            break
        case 'tipgy':
            document.body.style.backgroundColor = "rgba(90, 174, 0, 0.224)"
            break
        default:
            document.body.style.backgroundColor = 'beige'
    }

    const [title, setTitle] = useState('')
    const [mydata, changeData] = useState(JSON.parse(data))
    const [actual, setActual] = useState(0)
    const [max, setMax] = useState(0)
    const [stats, setStats] = useState([0,0,0,0,0,0])

    useEffect(() => {
        const storedData = localStorage.getItem(name)
        if (storedData) {
            changeData(JSON.parse(storedData))
        }
    }, [name]);

    function onInput(id, value, e) {
        if (value === 'defName')
        {
            var temp = mydata
            temp.name = e.target.value
            changeData(temp)
            localStorage.setItem(name, JSON.stringify(temp))
            return
        }
        var temp = []
        for(let i = 0; i < mydata.grades.length; i++)
        {
            let temp2 = mydata.grades[i]
            if (id === temp2.id)
            {
                if (value === 'done')
                {
                    temp2[value] = !temp2[value]
                } else {
                    temp2[value] = e.target.value
                }
            }
            temp.push(temp2)
        }

        var elem = calculateStats()

        var db = elem[2]
        var donedb = elem[3]
        
        setStats([donedb[0],db[0],donedb[2],db[2],donedb[1],db[1]])
        var stat = {
            tasks : db[2],
            homeworks : db[1],
            ZH : db[0],
            others : db[3]
        }

        //Jegy ellenőrzése
        var uptodate = elem[0]
        var jegy = mydata.points.grade
        if(mydata.points.format === '%')
        {

        } else {
            if (mydata.points.lower[3] <= uptodate) jegy = 5
            else if (mydata.points.lower[2] <= uptodate) jegy = 4
            else if (mydata.points.lower[1] <= uptodate) jegy = 3
            else if (mydata.points.lower[0] <= uptodate) jegy = 2
            else jegy = 1
        }
        var newobj = {...mydata.points, grade : jegy}

        localStorage.setItem(name, JSON.stringify({...mydata, points : newobj, grades: temp, statistics : stat}))
        changeData({...mydata, points : newobj, grades: temp, statistics : stat})
    }

    function calculateStats()
    {
        let state = 0
        let maximum = 0
        var db = [0,0,0,0]
        var donedb = [0,0,0]
        for(let i = 0; i < mydata.grades.length; i++)
        {
            if (mydata.grades[i].done === true)
            {
                state += parseInt(mydata.grades[i].value)
                maximum += parseInt(mydata.grades[i].max)
            }
            if(mydata.grades[i].type.includes('ZH')) 
            {
                db[0]++
                if (mydata.grades[i].done == true) donedb[0]++
            } else if(mydata.grades[i].type.includes('Házi'))
            {
                db[1]++
                if (mydata.grades[i].done == true) donedb[1]++
            } else if(mydata.grades[i].type.includes('Beadandó'))
            {
                db[2]++
                if (mydata.grades[i].done == true) donedb[2]++
            } else 
            {
                db[3]++
            }
        }

        return [state, maximum, db, donedb]
    }

    useEffect(() => {
        setTitle(mydata.name)

        var elem = calculateStats()
        var db = elem[2]
        var donedb = elem[3]
        
        setActual(elem[0])
        setMax(elem[1])
        setStats([donedb[0],db[0],donedb[2],db[2],donedb[1],db[1]])
    }, [mydata]);

    function addNewRow()
    {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        
        const newRow = {
            id : generateUniqueId(),
            type : '', 
            date : `${year}-${month}-${day}`,
            done : false,
            value : 0,
            max : 0
        }
        const updatedData = {
            ...mydata,
            grades: [...mydata.grades, newRow]
          };
      
        localStorage.setItem(name, JSON.stringify(updatedData)) 
        changeData(updatedData)
    }

    function deleteData(id)
    {
        console.log(id)
        const updatedGrades = mydata.grades.filter((e) => e.id !== id)
        const updatedData = {
            ...mydata,
            grades : updatedGrades
        }
        console.log(updatedData)
        localStorage.setItem(name, JSON.stringify(updatedData))
        changeData(updatedData)
    }

    function generateUniqueId() {
        return Math.random().toString(36).substr(2, 9)
    }

    return (
        <FadeIn>
            <div className='columnone'>
                <h1>
                    <input type='text' defaultValue={title} onChange={(t) => onInput(0, 'defName', t)}/>
                </h1>
                                    
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th className='longer'><FaPencilAlt /></th>
                            <th className='date_width'>Dátum/Határidő</th>
                            <th><FaCheck /></th>
                            <th>Érték</th>
                            <th>Max</th>
                        </tr>
                    </thead>
                    <tbody>
                            {mydata.grades.map((e) => (
                                <tr key={e.id} className={e.done !== false ? 'greenRow' : ''}> 
                                    <td onClick={() => deleteData(e.id)} className='deleteRow'>
                                        {mydata.grades.findIndex((grade) => grade.id === e.id) + 1}
                                    </td>
                                    <td className='typeName'>
                                        <input type='text' defaultValue={e.type} onChange={(t) => onInput(e.id, 'type', t)}/>
                                    </td>
                                    <td>
                                        <input type='date'  defaultValue={e.date}  onChange={(t) => onInput(e.id, 'date', t)} />
                                    </td>
                                    <td>
                                        <input type='checkbox' defaultChecked={e.done} onChange={(t) => onInput(e.id, 'done', t)}/>
                                    </td>
                                    <td>
                                        <input type='text' defaultValue={e.value} onChange={(t) => onInput(e.id, 'value', t)}/>
                                    </td>
                                    <td>
                                        <input type='text' defaultValue={e.max} onChange={(t) => onInput(e.id, 'max', t)}/>
                                    </td>
                                </tr>
                            ))}
                        <tr>
                            <td className='addCell' colSpan={6}><button onClick={() => addNewRow()}><IoMdAddCircleOutline /></button></td>
                        </tr>
                        <tr>
                            <td className='addCell' colSpan={4}>SZUM:</td>
                            <td>{actual}</td>
                            <td>{max}</td>
                        </tr>
                    </tbody>
                </table>
                <div className='others'>
                    <h2>Megjegyzés</h2>
                    <textarea></textarea>
                </div>
            </div>
            <div className='columntwo'>
                    <div className='statistics'>
                        <h2>Jelenlegi jegy:&emsp;{mydata.points.grade}</h2>
                        <h4>
                            <input type='text' defaultValue={'80%'} />- 
                            <input type='text' defaultValue={'100%'} /> - 5
                            &ensp;<FaHandPointLeft />&nbsp;{mydata.points.lower[3]-actual} p.
                        </h4>
                        <h4>
                            <input type='text' defaultValue={'70%'} />- 
                            <input type='text' defaultValue={'79%'} /> - 4
                            &ensp;<FaHandPointLeft />&nbsp;{mydata.points.lower[2]-actual} p.
                        </h4>
                        <h4>
                            <input type='text' defaultValue={'60%'} />- 
                            <input type='text' defaultValue={'69%'} /> - 3
                            &ensp;<FaHandPointLeft />&nbsp;{mydata.points.lower[1]-actual} p.
                        </h4>
                        <h4>
                            <input type='text' defaultValue={'50%'} />- 
                            <input type='text' defaultValue={'59%'} /> - 2
                            &ensp;<FaHandPointLeft />&nbsp;{mydata.points.lower[0]-actual} p.
                        </h4>
                    </div>
                    <div className='statistics'>
                        <h2>Statisztika</h2>
                        <h4>Megírt ZH: {stats[0]} / {stats[1]}</h4>
                        <h4>Elkészült Beadandó: {stats[2]} / {stats[3]}</h4>
                        <h4>Elkészült Házi feladat: {stats[4]} / {stats[5]}</h4>
                    </div>
                </div>
        </FadeIn>
    )
}

export default Subject;