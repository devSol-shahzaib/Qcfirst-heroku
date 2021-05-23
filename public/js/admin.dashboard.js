$(document).ready(() => {
  getAllCourses();
  getAllInstructors();
  getAllStudents();
   });
   const getAllStudents = async () =>{
    const response = await fetch(
      "/api/user/getAllStudents",
      {
        method: "get",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        if (data.message != undefined) {
          alert(data.message);
        } else {
          let markup = "";
          if ($("#studentList").children().length != 0) {
            $("#studentList").empty();
          }
          if (data.length) {
            data.map((student) => {
              markup = `<tr>
              <td>${student._id}</td>
              <td>${student.firstName}</td>
              <td>${student.lastName}</td>
              <td>${student.email}</td>
              <td>${student.password}</td>
                                 
                                  </tr>`;
  
             
                                
              $("#studentList").append(markup);
            });
          } else {
            $("#studentList").append(
              "<td colspan='5'><h3>No student added yet<h3></td>"
            );
          }
        }
      })
      .catch((err) => {
        alert(err);
      });
  }
  
   const getAllInstructors = async () =>{
    const response = await fetch(
      "/api/user/getAllInstructors",
      {
        method: "get",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        if (data.message != undefined) {
          alert(data.message);
        } else {
          let markup = "";
          if ($("#instructorList").children().length != 0) {
            $("#instructorList").empty();
          }
          if (data.length) {
            data.map((instructor) => {
              markup = `<tr>
                                  <td>${instructor._id}</td>
                                  <td>${instructor.firstName}</td>
                                  <td>${instructor.lastName}</td>
                                  <td>${instructor.email}</td>
                                  <td>${instructor.password}</td>
                        </tr>`;
  
             
                                
              $("#instructorList").append(markup);
            
            });
          } else {
            $("#instructorList").append(
              "<td colspan='5'><h3>No instructor added yet<h3></td>"
            );
          }
        }
      })
      .catch((err) => {
        alert(err);
      });
  }
  

   const getAllCourses = async () =>{
    const response = await fetch(
      "/api/course/getAllCourses",
      {
        method: "get",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (data.message != undefined) {
          alert(data.message);
        } else {
          let markup = "";
          if ($("#courseList").children().length != 0) {
            $("#courseList").empty();
          }
          if (data.length) {
            data.map((course) => {
              markup = `<tr>
                                <td>${course._id}</td>
                                <td>${course.courseName}</td>
                                <td>${course.semester}</td>
                                <td>${course.department}</td>
                                  <td>${course.capacity}</td>
                                  <td>${course.schedule}</td>
                                  <td>${course.students.length}</td>
                                  <td>${course.deadline}</td>
                        </tr>`;
  
             
                                
              $("#courseList").append(markup);
              
            });
          } 
          else {
            $("#courseList").append(
              "<td colspan='8'><h3>No course added yet<h3></td>"
            );
          }
        
        }
      })
      .catch((err) => {
        alert(err);
      });
  }
  