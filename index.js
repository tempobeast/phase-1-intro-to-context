//create employee object
//init empty array for time in 
//init empty array for time out 


newEmployeeArr = [
    ['Gordy', 'Gordon', 'Organ Player', 24],
    ['Eddy', 'Edwards', 'Editor', 50],
    ['Kaki', 'Kantral', 'Coordinator', 65]
]

function createEmployeeRecord(array) {
    
    const employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
   return employee
}


function createEmployeeRecords(recordArray) {
    return recordArray.map(rec => createEmployeeRecord(rec))
}


//takes employee object and date stamp 
//returns employee record object
//
dave = ["Dave", "Davidson", "Dancer", 14];
daveTimeInStamp = ["2014-02-28 1400", "2014-03-28 1400", "2014-04-28 1400"];
daveTimeOutStamp = ["2014-02-28 1900", "2014-03-28 1900", "2014-04-28 1900"];
function createTimeInEvent(empObject, timeStamp) {
    let splitStamp = timeStamp.split(" ");
    let hr = parseInt(splitStamp[1])
    let inEvent = {
        type: 'TimeIn',
        date: splitStamp[0],
        hour: hr
    }
    empObject.timeInEvents.push(inEvent)
   
    return empObject
}

function createTimeOutEvent(empObject, timeStamp) {
    //let emp = createEmployeeRecord(empObject);
    let splitStamp = timeStamp.split(" ");
    let hr = parseInt(splitStamp[1])
    let outEvent = {
        type: 'TimeOut',
        date: splitStamp[0],
        hour: hr
    }
    empObject.timeOutEvents.push(outEvent)
   
    return empObject
}

function hoursWorkedOnDate(empObject, workDate) {
    let ins = empObject.timeInEvents;
    let outs = empObject.timeOutEvents;
    const inEvents = ins.find(inEvent => inEvent.date === workDate)
    const outEvents = outs.find(outEvent => outEvent.date === workDate)
    return (outEvents.hour - inEvents.hour) / 100

    // for (let i = 0; i < empObject.timeInEvents.length; i++){
    //     if (ins[i].date === workDate && outs[i].date === workDate) {
    //         return (outs[i].hour - ins[i].hour) / 100
    //     }
    //}
}

function wagesEarnedOnDate(empObject, workDate) {
    let hours = hoursWorkedOnDate(empObject, workDate)
    let hourly = empObject.payPerHour
    return hours * hourly
}

    function allWagesFor(empObject) {
        const eligibleDates = empObject.timeInEvents.map(function (e) {
        return e.date
    })
        const payable = eligibleDates.reduce(function (memo, d) {
            return memo + wagesEarnedOnDate(empObject, d)
        }, 0)
        return payable

        // let timeEventsArray = empObject.timeInEvents
        // return timeEventsArray.reduce(wagesEarnedOnDate(empObject, timeEventsArray.date), 0)
        // for (let i = 0; i < empObject.timeInEvents.length; i++) {
        //     const wagesPerDate = wagesEarnedOnDate(empObject, empObject.timeInEvents[i].date)
        //     sum += wagesPerDate
        // }
        
    }
   
    
    function calculatePayroll(recordsArray) {
       return recordsArray.reduce((total, rec) => {
           return total + allWagesFor(rec)
    }, 0)
}