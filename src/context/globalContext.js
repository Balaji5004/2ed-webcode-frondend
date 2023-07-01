import React from "react";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";


const BASE_URL = "http://localhost:8080/api/v1/";


const globalContext = React.createContext()


export const GlobalProvider = ({children}) => {

     const [incomes, setIncomes] = useState([])
     const [expenses, setExpenses] = useState([])
     const [error, setError] = useState(null)

     //calculate income

     const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`,income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes()
        console.log(response)
        
     }
     const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
        console.log(response.data)
    }

    const deleteIncome = async (id) => {
        const response = await axios.delete(`${BASE_URL}delete-income/${id}`)
        console.log(response)
        getIncomes()
    }

       const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) => {
            totalIncome = totalIncome + income.amount   
        })
          return totalIncome 
       }

          //calculate Expense

     const addExpense = async (income) => {
        const response = await axios.post(`${BASE_URL}add-expense`,income)
       
           .catch((err) => {
            
           })
           getExpenses()
           console.log(response)
        
     }
     const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        const res = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        
        getExpenses()
        console.log(res)
    }

       const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) => {
            totalIncome = totalIncome + income.amount   
        })
          return totalIncome
       }
       
       const totalBalance = () => {
          return totalIncome() - totalExpenses()
       }

       const transactionHistory = () => {
            const history = [...incomes, ...expenses]
            history.sort((a, b) => {
                return new Date(b.createAt) - new Date(a.createAt)
            })
            return history.slice(0, 3)
       }
       

    return(
        <globalContext.Provider value={{
            addIncome, 
            getIncomes, 
            incomes, 
            deleteIncome, 
            totalIncome,
            addExpense,
            getExpenses,
            expenses,   
            deleteExpense,
            totalExpenses,
            error,
            setError,
            totalBalance,
            transactionHistory,
            
            }}>

            {children}
        </globalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(globalContext)
}