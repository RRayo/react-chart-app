import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { getDatabase, ref, runTransaction } from "firebase/database";
import { useState } from "react";
import WaitAsync from "./components/WaitAsync";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";
import logo from "./logo.svg";
import "./App.css";

const InvestmentEvolutions = () => {
  const [data, setData] = useState([]);

  //import { getAnalytics } from "firebase/analytics";
  const firebaseConfig = {
    apiKey: "AIzaSyArGiRgGd2MfE65_9sjE2QX49gt1sP0GmA",
    authDomain: "racional-exam.firebaseapp.com",
    databaseURL: "https://racional-exam.firebaseio.com",
    projectId: "racional-exam",
    storageBucket: "racional-exam.appspot.com",
    messagingSenderId: "669314004725",
    appId: "1:669314004725:web:48bd14a97d7db43c91f7bc",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const invest = doc(db, "investmentEvolutions/user1");

  const getData = async () => {
    try {
      const invest = doc(db, "investmentEvolutions/user1");
      const investSnapshot = await getDoc(invest);
      let docData;
      if (investSnapshot.exists()) {
        docData = investSnapshot.data();
        setData(docData);
        // console.log(`DATA inversiones ${JSON.stringify(docData)}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  function listenInvestments() {
    let docData = "";
    onSnapshot(invest, docSnapshot => {
      if (docSnapshot.exists()) {
        docData = docSnapshot.data();
        setData(docData);
        // console.log(`DATA LISTENER inversiones ${JSON.stringify(docData)}`);
      }
    });
  }

  return (
    <div style={{ width: "100%" }}>
      <WaitAsync func={listenInvestments}>
        {/* {JSON.stringify(data)} */}

        {data.length === 0 ? (
          <div>
            <div>Loading Data</div>
            <div>
              <img src={logo} className="App-logo" alt="logo" />
            </div>
          </div>
        ) : (
          <div>
            <p>RACIONAL</p>
            <p>
              Investment Data from{" "}
              {JSON.stringify(
                new Date(data["array"][0].date.seconds * 1000).getFullYear()
              )}
            </p>
            <div style={{ width: 700, marginTop: 30 }}>
              <LineChart
                chartData={{
                  labels: data["array"].map(
                    d =>
                      new Date(d.date.seconds * 1000)
                        .toISOString()
                        .split("T")[0]
                  ),
                  datasets: [
                    {
                      label: "Portfolio Value",
                      data: data["array"].map(d => d.portfolioValue.toFixed(2)),
                      backgroundColor: ["#20C20E"],
                      pointRadius: 1,
                    },
                    {
                      label: "Contributions",
                      data: data["array"].map(d => d.contributions.toFixed(2)),
                      backgroundColor: ["#0095EF"],
                      pointRadius: 1,
                    },
                  ],
                }}
              />
            </div>
            <div style={{ width: 700, marginTop: 100 }}>
              <LineChart
                chartData={{
                  labels: data["array"].map(
                    d =>
                      new Date(d.date.seconds * 1000)
                        .toISOString()
                        .split("T")[0]
                  ),
                  datasets: [
                    {
                      label: "Portfolio Index",
                      data: data["array"].map(d => d.portfolioIndex.toFixed(2)),
                      backgroundColor: [
                        "#ecf0f1",
                        "rgba(75,192,192,1)",
                        "#50AF95",
                        "#f3ba2f",
                        "#2a71d0",
                      ],
                      borderColor: "black",
                      borderWidth: 2,
                    },
                  ],
                }}
              />
            </div>

            <div style={{ width: 700, marginTop: 100 }}>
              <LineChart
                chartData={{
                  labels: data["array"].map(
                    d =>
                      new Date(d.date.seconds * 1000)
                        .toISOString()
                        .split("T")[0]
                  ),
                  datasets: [
                    {
                      label: "Daily Return",
                      data: data["array"].map(d => d.dailyReturn.toFixed(6)),
                      backgroundColor: [
                        "rgba(75,192,192,1)",
                        "#ecf0f1",
                        "#50AF95",
                        "#f3ba2f",
                        "#2a71d0",
                      ],
                      borderColor: "black",
                      borderWidth: 2,
                    },
                  ],
                }}
              />
            </div>
          </div>
        )}
      </WaitAsync>
    </div>
  );
};

export default InvestmentEvolutions;
