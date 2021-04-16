/** This code is written by bemnet dejene on Jan 4 2021
 * Purpose of project is an assessment from hatchway of my front end skills => clone webapp using frontend framework and style with HTML and CSS
 * 
 */


import StudentCard from './components/StudentCard'
import './App.css';
import { useEffect, useState } from 'react';




function App() {
  const [studentData, setStudentData] = useState("");
  const [nameSearched, setNameSearched] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // const [tagSearched, setTagSearched] = useState("");
  // const [tagSearchResults, setTagSearchResults] = useState([]);

  useEffect(() => {
    async function getStudentContentAPI() {
      let assessAPI = await (await fetch('https://api.hatchways.io/assessment/students')).json();
      let students = assessAPI.students;
      setStudentData(students.map((student)=> {
        let sum = 0;
        let average = 0;

        for (let count in student.grades) {
          sum += parseInt(student.grades[count]);
        }
        average = sum / student.grades.length;

        return (
          <StudentCard key={student.id} id={student.id} studentName={`${student.firstName.toUpperCase()} ${student.lastName.toUpperCase()}`} 
                    email={student.email} company={student.company} 
                    skills={student.skill} imgLink={student.pic} 
                    gradeAvgPercent={average}
                    gradeAvgArray={student.grades.map((grade, index) => <p className='test-history'>Test {index + 1}: {grade}%</p>)}
                    >
                      
          </StudentCard>
        )
      })
    )}
    getStudentContentAPI()
   }, []);


  const handleNameSearch = (searchValue) => {
    let lowerCaseSearch = searchValue.toLowerCase();
    setNameSearched(lowerCaseSearch);
    
    let searchLength = lowerCaseSearch.length;
    let searchHits = studentData.map((student) => {
      let studentName = student.props.studentName.toLowerCase();
      let nameSpaceIndex = studentName.indexOf(' ');

      if (studentName.slice(0, searchLength) === lowerCaseSearch) {
        return student;
      } else if (studentName.slice(nameSpaceIndex + 1, (nameSpaceIndex + 1) + searchLength) === lowerCaseSearch) {
        return student;
      } else {
        return null;
        }
      })
      setSearchResults(searchHits);
  }

  // const handleTagSearch = (tagSearch) => {
  //   let tagSearchLower = tagSearch.toLowerCase();
  //   let searchLength = tagSearchLower.length;
  //   setTagSearched(tagSearchLower);


  //   let myTags = document.querySelectorAll('.tags-container');
    
  //   for (let count in myTags) {
  //     let tagArray = myTags[count].children;
  //     for (let count in tagArray) {
  //       let currTagValue = tagArray[count].innerHTML;
  //       if (currTagValue !== null && currTagValue !== undefined) {
  //         if (currTagValue.slice(0, searchLength).toLowerCase() === tagSearchLower) {
  //           console.log(myTags)
  //         } else {
  //           document.getElementById(count).style.display = 'none';
  //         }
  //       } 
  //     }
  //   }
  // }

  return (
  <div className="body-wrapper">
    <div className='student-content-wrapper'>
      <input type='text' placeholder='Search by name' className='search' id='name-search' value={nameSearched} onChange={e => handleNameSearch(e.target.value)}></input>
      {/* <input type='text' placeholder='Search by tag' className='search' id='tag-search' value={tagSearched} onChange={e => handleTagSearch(e.target.value)}></input> */}
      <div  className='student-list'>
        {nameSearched.length === 0 ? studentData : searchResults}

        {/* {tagSearchResults} */}
      </div>
    </div>
  </div>
  );
}

export default App;
