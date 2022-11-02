//xay nha doumain
const express = require("express");
const app = express();
//cap cong
const PORT = process.env.PORT || 5000;

//mo cua

app.listen(PORT, function () {
    console.log("server is running...");
});
//config connect to mysql
const configDB = {
    host: "139.180.186.20",  // may chu chua db, binh thg la localhost
    port: 3306,
    database: "t2207e",
    user: "t2207e",
    password:"t2207e123",   // xamp : neu ko co thi de la "" , neu xai mamp ma ko co thi la "root"
    multipleStatements: true // cho phep su dung nhieu cau sql 1 lan gui yeu cau
};
//connect to mysql
const mysql = require("mysql");
const conn = mysql.createConnection(configDB);

//api list all class
app.get("/get-classes", function (req,res) {
    const sql = "select * from classes";
      conn.query(sql,function (err,data) {
          if(err) {
              res.send("404 not found");
          } else {
              res.send(data);
          }

      }
      //ham callback do thoi gian chay sql co do tre
        //
        )
    // neu res.send() o day thi cau tren ko co tac dung
});

//api list all student

app.get("/get-students", function (req,res) {
    const sql = "select * from students";
    conn.query(sql,function (err,data) {
            if(err) {
                res.send("404 not found");
            } else {
                res.send(data);
            }

        })
});
// loc sinh vien theo ma lop cid
app.get("/student-by-class", function (req,res) {
    const cid = req.query.cid;
    const sql = "select * from students where cid = "+cid;
    conn.query(sql,function (err,data) {
        if(err) {
            res.send("404 not found");
        } else {
            res.send(data);
        }

    })
});
//tim sinh vien theo ten hoac email
app.get("/search-student", function (req,res) {
    const q = req.query.q;
    const sql = `select * from students where name like '%${q}%' or email like '%${q}%' `;
    conn.query(sql,function (err,data) {
        if(err) {
            res.send("404 not found");
        } else {
            res.send(data);
        }

    })
});
// tim sinh vien theo ten lop
app.get("/student-of-class", function (req,res) {
    const lop = req.query.lop;
    const sql = `select * from students where cid in ( select cid from classes where name like '%${lop}%' ) `;
    conn.query(sql,function (err,data) {
        if(err) {
            res.send("404 not found");
        } else {
            res.send(data);
        }

    })
});
// get 1 sinh vien theo id
app.get("/detail-student", function (req,res) {
    const sid = req.query.sid;
    const sql = `select * from students where sid =  ${sid} `;
    conn.query(sql,function (err,data) {
        if(err) {
            res.send("404 not found");
        } else if (data.length > 0 ) {
            res.send(data[0]);
        }
        else {
            res.status(404).send("404 not found");
        }

    })
});

//restapi

app.get("/student", function (req, res) {
    //liet ke sv
    res.send("Student with Get");
    })


app.post("/student", function (req, res) {
    //them sv
    res.send("Student with post");
})


app.put("/student", function (req, res) {
    //update sv
    res.send("Student with put");
})


app.delete("/student", function (req, res) {
    //xoa sv
    res.send("Student with delete");
})