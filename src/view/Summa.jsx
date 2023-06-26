import { useEffect, useState } from "react"
import FadeIn from "react-fade-in/lib/FadeIn"

function Summa ({name, links}) {

  document.body.style.backgroundColor = "rgba(0,0,0,0.1)"

  const [datas, setDatas] = useState([])
  const [sumCredit, setSumCredit] = useState(0)
  const [avgs, setAvgs] = useState([0,0,0,0,0,0])
  const [stats, setStats] = useState([0,0,0,0])

  useEffect(() => {
    var temp = []
    var elems = []
    for(let i = 0; i < links.length; i++) elems[i] = localStorage.getItem(links[i])

    for(let i = 0; i < elems.length; i++)
    {
      var elem = JSON.parse(elems[i])
      if(elem.name !== '')
      {
        temp.push(elem)
      }
    }
    setDatas(temp)
  }, [name])

  useEffect(() => {
    var sum = 0
    var szorzat = 0
    var szorzat2 = 0
    var hagyomanyos = [0,0]
    var db = 0
    var stat = [0,0,0,0]
    for(let i = 0; i < datas.length; i++)
    {
      var elem = datas[i]
      if(elem.name !== '')
      {
        sum += parseInt(elem.credit)
        hagyomanyos[0] += parseInt(elem.points.grade)
        hagyomanyos[1] += parseInt(elem.points.wishedGrade)
        szorzat += parseInt(elem.points.grade) * parseInt(elem.credit)
        szorzat2 += parseInt(elem.points.wishedGrade) * parseInt(elem.credit)
        db++

        stat[0] += parseInt(elem.statistics.ZH)
        stat[1] += parseInt(elem.statistics.tasks)
        stat[2] += parseInt(elem.statistics.homeworks)
        stat[3] += parseInt(elem.statistics.others)
      }
    }
    setAvgs([Math.round(szorzat/30 * 100) / 100,
             Math.round(szorzat2/30 * 100) / 100,
             Math.round(szorzat/sum * 100) / 100,
             Math.round(szorzat2/sum * 100) / 100,
             Math.round(hagyomanyos[0]/db * 100) / 100,
             Math.round(hagyomanyos[1]/db * 100) / 100])
    setSumCredit(sum)

    setStats(stat)
  }, [name, datas])


  function onInput(elem, value, e)
  {
    var temp = datas.filter(t => t.id === elem.id)
    if (value === 'wishedGrade')
    {
      temp[0].points.wishedGrade = e.target.value
    } else {
      temp[0][value] = parseInt(e.target.value)
    }

    localStorage.setItem(elem.shortDef, JSON.stringify(temp[0]))

    var temp2 = []
    for(let i = 0; i < datas.length; i++)
    {
      if(elem.id !== datas[i].id)
      {
        temp2.push(datas[i])
      } else {
        temp2.push(temp[0])
      }
    }

    setDatas(temp2)
  }

  return (
    <FadeIn>
        <div className='columnone'>
        <h1>Összegzés</h1>
        <table className="sumTable">
          <thead>
            <tr>
              <th>Tárgy</th>
              <th>Kredit</th>
              <th>Jelenlegi jegy</th>
              <th>Becsült jegy</th>
            </tr>
          </thead>
          <tbody>
            {datas.map(e => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>
                  <input type='number' defaultValue={e.credit} onChange={(t) => onInput(e, 'credit', t)}/>
                </td>
                <td>
                  {e.points.grade}
                </td>
                <td>
                  <input type='number' defaultValue={e.points.wishedGrade} onChange={(t) => onInput(e, 'wishedGrade', t)} min={1} max={5}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className='columntwo'>
          <div className='statistics'>
            <h2>Átlagok</h2>
            <hr />
            <table>
              <thead>
              <tr>
                <td></td>
                <th>Jelenlegi</th>
                <th>Becsült</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Kreditindex</td>
                <td>{avgs[0]}</td>
                <td>{avgs[1]}</td>
              </tr>
              <tr>
                <td>Súlyozott átlag</td>
                <td>{avgs[2]}</td>
                <td>{avgs[3]}</td>
              </tr>
              <tr>
                <td>Hagyományos átlag</td>
                <td>{avgs[4]}</td>
                <td>{avgs[5]}</td>
              </tr>
              </tbody>
            </table>
            <h3>Felvett kredit : {sumCredit}</h3>
          </div>

          <div className='statistics'>
            <h2>Teljesítmény</h2>
            <hr />
            <h3>{stats[0]} db ZH a félév során</h3>
            <h3>{stats[1]} db Beadandó a félév során</h3>
            <h3>{stats[2]} db Házi a félév során</h3>
            <h3>{stats[3]} db Egyéb teendő</h3>
          </div>
        </div>
    </FadeIn>
  )
}

export default Summa