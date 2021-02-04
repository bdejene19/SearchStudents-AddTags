import React, { useState, useEffect } from 'react'

export default function StudentCard(props) {

    const [expanded, setExpaneded] = useState(false);
    const handleExpansion = (boolExpansion, id) => {
        if (boolExpansion === false) {
            document.getElementById(id).style.display = 'block';
            setExpaneded(true);
        } else {
            document.getElementById(id).style.display = 'none';
            setExpaneded(false);
        }
    }

    useEffect(() => {
        document.getElementById(props.id).style.display = 'none';
    }, [props.id])

    const [tagValue, setTagValue] = useState("");
    const [myTags, setMyTags] = useState([])

    const handleEnterKey = (keyboardValue) => {
        if (keyboardValue.key === 'Enter') {
            setMyTags([...myTags, <div className='tag'>{keyboardValue.target.value}</div>]);
            setTagValue("");
        }
    }
    return (
        <div>
            <div className='single-student-container'>
                <img src={props.imgLink} alt={props.studentName} className='student-photo'></img> 
                <div className='student-content'>
                    <h2 className='studentName'>{props.studentName}</h2>
                    <div style={{textAlign: 'right', padding: '0.5em', paddingBottom: '0'}}>

                        {expanded === true ? <button onClick={() => handleExpansion(expanded, props.id)} className='btn-expansion'><b>-</b></button> : 
                        <button onClick={() => handleExpansion(expanded, props.id)} className='btn-expansion'><b>&#x2b;</b></button>}
                    </div>

                    <div className='student-contactInfo'>
                        Email: {props.email} <br></br>
                        Company: {props.company} <br></br>
                        Skills: {props.skills} <br></br>
                        Average: {props.gradeAvgPercent}%
                       
                        <div id={props.id}>
                            <br></br>
                            {props.gradeAvgArray}
                        </div>
                        <br></br>
                        <div className='add-tag-container'>
                            <div className='tags-container'>
                                {myTags}
                            </div>
                            <input type='text' placeholder='Add a tag'  value={tagValue} onChange={e => setTagValue(e.target.value)} className='tag-input' onKeyPress={e => handleEnterKey(e)}></input>
                            <br></br>
                        </div>
                    </div>
                   
                </div>
            </div> 
        </div>
    )
}
