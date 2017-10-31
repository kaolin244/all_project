Node.prototype.insertAfter = function (newNode)
{
    if (this.nextSibling)
    {
        return this.parentNode.insertBefore(newNode, this.nextSibling);
    } else
    {
        return this.parentNode.appendChild(newNode);
    }
};

Node.prototype.empty = function ()
{
    if (this.childNodes.length)
    {
        for (var x = this.childNodes.length - 1; x >= 0; x--)
        {
            this.removeChild(this.childNodes[x]);
        }
    }
};

_Event = function ()
{
    this.now = new Date();

    this.day = this.now.getDate();
    this.month = this.now.getMonth();
    this.year = this.now.getFullYear();
    this.hour = 6;
    this.minute = 30;
    this.title = null;
    this.text = null;

    this.divDisplayPlan = null;
    this.divDisplay = null;
        this.divDisplayDate = null;
            this.divDateBottom = null;
                this.divCalendarTable = null;
                this.divDateSwitch = null;
                    this.nameDay = null;
                    this.numberDay = null;
                    this.nameMonth = null;
                    this.numberYear = null;
        this.divDisplayHour = null;
        this.divDisplayTitle = null;
        this.divDisplayText = null;

    this.o = this;

    this.createYearNumber = function ()
    {
        var year = document.createTextNode(this.year);
        this.numberYear.empty();
        this.numberYear.appendChild(year);
    };
    this.createDayName = function ()
    {
        var dayNames = ['Niedziela','Poniedziałek','Wtorek','Środa','Czwartek','Piątek','Sobota'];
        var newDate = new Date(this.year, this.month, this.day);
        var day = document.createTextNode(dayNames[newDate.getDay()]);
        this.nameDay.empty();
        this.nameDay.appendChild(day);

        var dayNumber = document.createTextNode(this.day);
        this.numberDay.empty();
        this.numberDay.appendChild(dayNumber);

    };
    this.createMonthName = function ()
    {
        this.createDayName();
        var monthNames = ['styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'];
        var month = document.createTextNode(monthNames[this.month]);
        this.nameMonth.empty();
        this.nameMonth.appendChild(month);
    };

    this.getDays = function()
    {
        var days;
        var month = this.month + 1;
        if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)
        {
            days = 31;
        }else if (month == 4 || month == 6 || month == 9 || month == 11)
        {
            days = 30;
        } else if (month == 2)
        {
            if (this.leapYear())
            {
                days = 29;
            } else
            {
                days = 28;
            }
        }
        return days;
    };

    this.leapYear = function()
    {
        if (((this.year % 4) == 0) && ((this.year % 100) != 0) || ((this.year % 400) == 0))
            return true;

        return false;
    };

    this.createCalendarTable = function ()
    {
        this.divCalendarTable.empty();
        var ob = this.o;
        var firstDayMonth = new Date(this.year, this.month, 0);

        var startPosition = firstDayMonth.getDay();

        var days = this.getDays();
        days += startPosition;

        var weekDay = ['Pon','Wto','Śro','Czw','Pią','Sob','Nie'];
        var table = document.createElement('table');
        table.className = 'tableDateDisplayPanel';


        var tr = document.createElement('tr');
        for(var i = 0; i < weekDay.length; i++)
        {
            var th = document.createElement('th');
            th.appendChild(document.createTextNode(weekDay[i]));
            tr.appendChild(th);
        }
        table.appendChild(tr);


        tr = document.createElement('tr');
        for(var j = 0; j < startPosition; j++)
        {
            if(j%7 == 0)
            {
                table.appendChild(tr);
                tr = document.createElement('tr');
            }
            var td = document.createElement('td');
            td.appendChild(document.createTextNode(' '));
            tr.appendChild(td);
        }


        for(var k = startPosition; k < days; k++)
        {
            if(k%7 == 0)
            {
                table.appendChild(tr);
                tr = document.createElement('tr');
            }

            var dayNr = parseInt(k - startPosition + 1);
            const dayNrConst = parseInt(k - startPosition + 1);
            if(dayNr < 10) dayNr = '0' + dayNr;

            td = document.createElement('td');
            td.appendChild(document.createTextNode(dayNr));
            td.className = 'ccc';
            td.onclick = function ()
            {
                console.log(dayNrConst);
                ob.day = dayNrConst;
                ob.createDayName();
            };
            tr.appendChild(td);
        }
        table.appendChild(td);
        this.divCalendarTable.appendChild(table);

        this.deleteCalendar = function ()
        {
            this.divPlace.parentNode.removeChild(this.divPlace);
            delete this.o;
        }
    };

    this.createDateSwitch = function ()
    {
        var ob = this.o;

        this.nameDay = document.createElement('div');
        this.numberDay = document.createElement('div');
        this.nameMonth = document.createElement('div');
        this.numberYear = document.createElement('div');

        var buttonDayPrev = document.createElement('input');
        buttonDayPrev.value = '<';
        buttonDayPrev.type = 'button';
        buttonDayPrev.className = 'aaa';
        buttonDayPrev.onclick = function ()
        {
            ob.day--;
            if(ob.day < 1)
            {
                ob.month--;
                if(ob.month < 0)
                {
                    ob.month = 11;
                    ob.year--;
                    ob.createYearNumber();
                }
                ob.day = ob.getDays();
            }
            ob.createCalendarTable();
            ob.createMonthName();
        };

        var buttonDayNext = document.createElement('input');
        buttonDayNext.value = '>';
        buttonDayNext.type = 'button';
        buttonDayNext.className = 'aaa';
        buttonDayNext.onclick = function ()
        {
            ob.day++;
            if(ob.day > ob.getDays())
            {
                ob.day = 1;
                ob.month++;
                if(ob.month > 11)
                {
                    ob.month = 0;
                    ob.year++;
                    ob.createYearNumber();
                }
            }

            ob.createCalendarTable();
            ob.createMonthName();
        };

        var buttonMonthPrev = document.createElement('input');
        buttonMonthPrev.value = '<';
        buttonMonthPrev.type = 'button';
        buttonMonthPrev.className = 'aaa';
        buttonMonthPrev.onclick = function ()
        {
            ob.month--;
            if(ob.month < 0)
            {
                ob.month = 11;
                ob.year--;
                ob.createYearNumber();
            }

            ob.createCalendarTable();
            ob.createMonthName();
        };

        var buttonMonthNext = document.createElement('input');
        buttonMonthNext.value = '>';
        buttonMonthNext.type = 'button';
        buttonMonthNext.className = 'aaa';
        buttonMonthNext.onclick = function ()
        {
            ob.month++;
            if(ob.month > 11)
            {
                ob.month = 0;
                ob.year++;
                ob.createYearNumber();
            }

            ob.createCalendarTable();
            ob.createMonthName();
        };

        var buttonYearPrev = document.createElement('input');
        buttonYearPrev.value = '<';
        buttonYearPrev.type = 'button';
        buttonYearPrev.className = 'aaa';
        buttonYearPrev.onclick = function ()
        {
            ob.year--;
            ob.month = 11;
            ob.day = 31;
            ob.createCalendarTable();
            ob.createMonthName();
            ob.createYearNumber();
        };

        var buttonYearNext = document.createElement('input');
        buttonYearNext.value = '>';
        buttonYearNext.type = 'button';
        buttonYearNext.className = 'aaa';
        buttonYearNext.onclick = function ()
        {
            ob.year++;
            ob.month = 0;
            ob.day = 1;
            ob.createCalendarTable();
            ob.createMonthName();
            ob.createYearNumber();
        };

        this.divDateSwitch.appendChild(this.nameDay);
        this.divDateSwitch.appendChild(buttonDayPrev);
        this.divDateSwitch.appendChild(this.numberDay);
        this.divDateSwitch.appendChild(buttonDayNext);
        this.divDateSwitch.appendChild(buttonMonthPrev);
        this.divDateSwitch.appendChild(this.nameMonth);
        this.divDateSwitch.appendChild(buttonMonthNext);
        this.divDateSwitch.appendChild(buttonYearPrev);
        this.divDateSwitch.appendChild(this.numberYear);
        this.divDateSwitch.appendChild(buttonYearNext);
        ob.createMonthName();
        ob.createYearNumber();

    };

    this.updateClock = function ()
    {
        if(this.hour > 23)
            this.hour = 4;
        if(this.hour < 4)
            this.hour = 23;

        if(this.minute > 55)
            this.minute = 0;
        if(this.minute < 0)
            this.minute = 55;

        var numbers = new Array(65);
        for(var i = 0; i < 61; i++)
            if(i < 10)
                numbers[i] = '0' + i;
            else
                numbers[i] = i;

        var hour = this.hour;
        var hourUp = this.hour + 1;
        var hourDown = this.hour - 1;
        if(this.hour == 23)
            hourUp = 4;
        if(this.hour == 4)
            hourDown = 23;

        document.getElementById('hour').innerHTML = numbers[hour];
        document.getElementById('hourUp').innerHTML = numbers[hourUp];
        document.getElementById('hourDown').innerHTML = numbers[hourDown];

        var minute = this.minute;
        var minuteUp = this.minute + 5;
        var minuteDown = this.minute - 5;
        if(this.minute == 55)
            minuteUp = 0;
        if(this.minute == 0)
            minuteDown = 55;
        document.getElementById('minute').innerHTML = numbers[minute];
        document.getElementById('minuteUp').innerHTML = numbers[minuteUp];
        document.getElementById('minuteDown').innerHTML = numbers[minuteDown];

    };
    this.createClock = function()
    {

        var ob = this.o;
        this.divDisplayHour.empty();
        var divTitleHour = document.createElement('div');
            divTitleHour.className = 'divTitleDisplayPanel';
            divTitleHour.innerHTML = 'Godzina';


        var table = document.createElement('table');
        var tr = document.createElement('tr');
        for(var i = 4; i <= 23; i++)
        {
            var td = document.createElement('td');
            if(i < 10)
                td.innerHTML = '0' + i + ':00';
            else
                td.innerHTML = i + ':00';

            const constI = i;
            td.onclick = function ()
            {
                ob.hour = constI;
                ob.updateClock();
            };
            tr.appendChild(td);
            if(i == 8 || i == 13 || i == 18 || i == 23)
            {
                var value;
                switch(i)
                {
                    case 8:
                        value = 0;
                        break;
                    case 13:
                        value = 15;
                        break;
                    case 18:
                        value = 30;
                        break;
                    case 23:
                        value = 45;
                }
                var tdMinutes = document.createElement('td');
                    tdMinutes.innerHTML = ':' + value ;
                const valueConst = value;
                tdMinutes.onclick = function ()
                {
                    ob.minute = valueConst;
                    ob.updateClock();
                };
                tr.appendChild(tdMinutes);
                table.appendChild(tr);
                tr = document.createElement('tr');
            }
        }
        table.className = 'hourTable';



        var hourUp = document.createElement('div');
            hourUp.className = 'displayUpClass';
            hourUp.setAttribute('id', 'hourUp');
            hourUp.onclick = function ()
            {
                ob.hour++;
                ob.updateClock();
            };
        var hour = document.createElement('div');
            hour.className = 'displayActualClockClass';
            hour.setAttribute('id', 'hour');
        var hourDown = document.createElement('div');
            hourDown.className = 'displayDownClass';
            hourDown.setAttribute('id', 'hourDown');
            hourDown.onclick = function ()
                {
                    ob.hour--;
                    ob.updateClock();
                };
        var minuteUp = document.createElement('div');
            minuteUp.className = 'displayUpClass';
            minuteUp.setAttribute('id', 'minuteUp');
            minuteUp.onclick = function ()
            {
                ob.minute += 5;
                ob.updateClock();
            };
        var minute = document.createElement('div');
            minute.className = 'displayActualClockClass';
            minute.setAttribute('id', 'minute');
        var minuteDown = document.createElement('div');
            minuteDown.className = 'displayDownClass';
            minuteDown.setAttribute('id', 'minuteDown');
            minuteDown.onclick = function ()
            {
                ob.minute -= 5;
                ob.updateClock();
            };

        var divDisplayHour = document.createElement('div');
            divDisplayHour.className = 'displayPartClockClass';
            divDisplayHour.appendChild(hourUp);
            divDisplayHour.appendChild(hour);
            divDisplayHour.appendChild(hourDown);
        var divDisplayMinute = document.createElement('div');
            divDisplayMinute.className = 'displayPartClockClass';
            divDisplayMinute.appendChild(minuteUp);
            divDisplayMinute.appendChild(minute);
            divDisplayMinute.appendChild(minuteDown);

        var clear = document.createElement('div');
            clear.className = 'clear';

        var divHourDisplayClass = document.createElement('div');
            divHourDisplayClass.className = 'divHourDisplayClass';
            divHourDisplayClass.appendChild(divDisplayHour);
            divHourDisplayClass.appendChild(divDisplayMinute);
            divHourDisplayClass.appendChild(clear);

        var divHourBottom = document.createElement('div');
            divHourBottom.className = 'divHourBottomClass';
            divHourBottom.appendChild(table);
            divHourBottom.appendChild(divHourDisplayClass);
            divHourBottom.appendChild(clear);

        this.divDisplayHour.appendChild(divTitleHour);
        this.divDisplayHour.appendChild(divHourBottom);

    };

    this.createTitleChoice = function ()
    {
        var ob = this.o;
        this.divDisplayTitle.empty();
        var divTitleTitle = document.createElement('div');
            divTitleTitle.className = 'divTitleDisplayPanel';
            divTitleTitle.innerHTML = 'Tytuł';

        var divTitleBottom = document.createElement('div');
            divTitleBottom.className = 'divTitleBottomClass';

        var divTableBottom = document.createElement('div');
            divTableBottom.className = 'divTableBottom';
        var divTitleChoice = document.createElement('div');
            divTitleChoice.className = 'divTitleChoice';
            divTitleChoice.innerHTML = 'divTitleChoice';
        var table = document.createElement('table');

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "ajax/getTitles.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function()
        {
            if(xhr.readyState == 4 && xhr.status == 200)
            {
                var data = JSON.parse(xhr.responseText);

                var row = document.createElement('tr');
                var counter = 0;
                for(var obj in data)
                {
                    const idEvent = obj;
                    counter++;
                    var column_name = document.createElement('td');
                        column_name.innerHTML = data[obj].name;
                        column_name.className = 'choiceListNameClass';
                        column_name.addEventListener('click', function ()
                        {
                            ob.title = idEvent;
                            divTitleChoice.empty();
                            divTitleChoice.appendChild(document.createTextNode(idEvent));
                        }, false);
                    var column_color = document.createElement('td');
                        column_color.style.backgroundColor = data[obj].color;
                        column_color.className = 'choiceListColorClass';
                    row.appendChild(column_name);
                    row.appendChild(column_color);
                    table.appendChild(row);
                    row = document.createElement('tr');

                }
                table.appendChild(row);
                divTableBottom.appendChild(table);
            }
        };
        xhr.send();

        this.divDisplayTitle.appendChild(divTitleTitle);
        divTitleBottom.appendChild(divTableBottom);
        divTitleBottom.appendChild(divTitleChoice);
        this.divDisplayTitle.appendChild(divTitleBottom);



    };

    this.createTextInput = function ()
    {
        var ob = this.o;

        this.divDisplayText.empty();
        var divTitleText = document.createElement('div');
            divTitleText.className = 'divTitleDisplayPanel';
            divTitleText.innerHTML = 'Tekst';


        var textInput = document.createElement('textarea');
            textInput.className = 'textAreaInput';

        var sendBtn = document.createElement('input');
            sendBtn.value = 'Wyśli';
            sendBtn.type = 'button';
            sendBtn.className = 'inputDisplaySend';
            sendBtn.addEventListener('click', function ()
            {
                alert(textInput.value);

            });

        this.divDisplayText.appendChild(divTitleText);
        this.divDisplayText.appendChild(textInput);
        this.divDisplayText.appendChild(sendBtn);
    };

    this.init = function ()
    {

        var clear = document.createElement('div');
        clear.className = 'clear';

        this.divDisplay = document.createElement('div');
        this.divDisplay.setAttribute('id', 'divDisplay');
        this.divDisplay.className = 'divDisplayClass';


        this.divDisplayPlan = document.createElement('div');
        this.divDisplayPlan.className = 'divDisplayPlanClass';


        var addData = document.createElement('div');
            addData.className = 'float';

        this.divDisplayDate = document.createElement('div');
        this.divDisplayDate.className = 'divDisplayDateClass';
            var divTitleCalendar = document.createElement('div');
                divTitleCalendar.className = 'divTitleDisplayPanel';
                divTitleCalendar.innerHTML = 'Data';
            this.divDateBottom = document.createElement('div');
            this.divDateBottom.className = 'divBottomDisplayPanel';
                this.divCalendarTable = document.createElement('div');
                this.divCalendarTable.className = 'displayCalendarTable';
                this.createCalendarTable();
                this.divDateSwitch = document.createElement('div');
                this.divDateSwitch.className = 'divDateDisplayPanel';
                this.createDateSwitch();

            this.divDateBottom.appendChild(this.divCalendarTable);
            this.divDateBottom.appendChild(this.divDateSwitch);
            this.divDateBottom.appendChild(clear);
        this.divDisplayDate.appendChild(divTitleCalendar);
        this.divDisplayDate.appendChild(this.divDateBottom);


        this.divDisplayHour = document.createElement('div');
        this.divDisplayHour.className = 'divDisplayHourClass';
        this.createClock();


        this.divDisplayTitle = document.createElement('div');
        this.divDisplayTitle.className = 'divDisplayTitleClass';
        this.createTitleChoice();


        this.divDisplayText = document.createElement('div');
        this.divDisplayText.className = 'divDisplayTextClass';
        this.createTextInput();

        addData.appendChild(this.divDisplayDate);
        addData.appendChild(this.divDisplayHour);
        addData.appendChild(this.divDisplayTitle);
        addData.appendChild(this.divDisplayText);


        this.divDisplay.appendChild(this.divDisplayPlan);
        this.divDisplay.appendChild(addData);
        this.divDisplay.appendChild(clear);
        document.getElementById('divRightSide').appendChild(this.divDisplay);
        this.updateClock();
    };
    this.init();
};

_Calendar = function (_obW, _class)
{
    this.now = new Date();
    this.day = this.now.getDate();
    this.day_now = this.now.getDate();
    this.month = this.now.getMonth();
    this.month_now = this.now.getMonth();
    this.year = this.now.getFullYear();
    this.year_now = this.now.getFullYear();
    this.input = _obW;
    this.divPlace = null;
    this.divCalendarTable = null;
    this.divMonthName = null;
    this.divButtons = null;
    this.divButtonsType = null;
    this.o = this;
    this.typeCalendar = 'month';
    this.weekNameData = {
        'day_start' : null,
        'day_end' : null,
        'month_start' : null,
        'month_end' : null,
        'year_start' : null,
        'year_end' : null
    };
    this.createButtons = function ()
    {

        var ob = this.o;
        var buttonPrev = document.createElement('input');
            buttonPrev.value = '<';
            buttonPrev.type = 'button';
            buttonPrev.className = 'input-prev';
            buttonPrev.onclick = function ()
            {
                if(ob.typeCalendar == 'month')
                    ob.month--;
                else if(ob.typeCalendar == 'week')
                    ob.day -= 4;
                else if(ob.typeCalendar == 'days')
                    ob.day--;

                if(ob.day < 1)
                {
                    ob.month--;
                    if(ob.month < 0)
                    {
                        ob.month = 11;
                        ob.year--;
                    }
                    ob.day += ob.getDays();
                }
                if(ob.month < 0)
                {
                    ob.month = 11;
                    ob.year--;
                }

                if(ob.typeCalendar == 'month')
                    ob.createCalendarTable();
                else if(ob.typeCalendar == 'week')
                    ob.createWeekCalendar();
                else if(ob.typeCalendar == 'days')
                    ob.createDayCalendar();

                ob.createMonthName();

            };
        this.divButtons.appendChild(buttonPrev);

        var buttonNext = document.createElement('input');
            buttonNext.className = 'input-next';
            buttonNext.value = '>';
            buttonNext.type = 'button';
            buttonNext.onclick = function ()
            {
                if(ob.typeCalendar == 'month')
                    ob.month++;
                else if(ob.typeCalendar == 'week')
                    ob.day += 7;
                else if(ob.typeCalendar == 'days')
                    ob.day++;
                if(ob.day > ob.getDays())
                {
                    var newDays = ob.getDays();
                    ob.month++;
                    ob.day -= newDays ;
                }
                if(ob.month > 11)
                {
                    ob.month = 0;
                    ob.year++;
                }
                if(ob.typeCalendar == 'month')
                    ob.createCalendarTable();
                else if(ob.typeCalendar == 'week')
                    ob.createWeekCalendar();
                else if(ob.typeCalendar == 'days')
                    ob.createDayCalendar();
                ob.createMonthName();
            };
        this.divButtons.appendChild(buttonNext);

        var buttonToday = document.createElement('input');
        buttonToday.value = 'Teraz';
        buttonToday.type = 'button';
        buttonToday.onclick = function ()
        {
            var now = new Date();
            ob.day = now.getDate();
            ob.month = now.getMonth();
            ob.year = now.getFullYear();
            if(ob.typeCalendar == 'month')
                ob.createCalendarTable();
            else if(ob.typeCalendar == 'week')
                ob.createWeekCalendar();
            else if(ob.typeCalendar == 'days')
                ob.createDayCalendar();
            ob.createMonthName();
        };
        this.divButtons.appendChild(buttonToday);


        var buttonMonths = document.createElement('input');
            buttonMonths.value = 'Miesiąc';
            buttonMonths.type = 'button';
            buttonMonths.onclick = function ()
            {
                ob.typeCalendar = 'month';
                ob.createCalendarTable();
                ob.createMonthName();
            };
        this.divButtonsType.appendChild(buttonMonths);

        var buttonWeeks = document.createElement('input');
            buttonWeeks.value = 'Tydzień';
            buttonWeeks.type = 'button';
            buttonWeeks.onclick = function ()
            {
                ob.typeCalendar = 'week';
                ob.createWeekCalendar();
                ob.createMonthName();
            };
        this.divButtonsType.appendChild(buttonWeeks);

        var buttonDays = document.createElement('input');
        buttonDays.value = 'Dzień';
        buttonDays.type = 'button';
        buttonDays.onclick = function ()
        {
            ob.typeCalendar = 'days';
            ob.createDayCalendar();
            ob.createMonthName();
        };
        this.divButtonsType.appendChild(buttonDays);
    };

    this.createMonthName = function ()
    {
        var monthNames = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

        if(this.typeCalendar == 'month')
        {
            var month = document.createTextNode(monthNames[this.month]);
            var year = document.createTextNode(' ' + this.year);
            this.divMonthName.empty();
            this.divMonthName.appendChild(month);
            this.divMonthName.appendChild(year);
        }else if(this.typeCalendar == 'week'){
            var week = document.createElement('div');
            week.innerHTML = this.weekNameData.day_start;
            if(this.weekNameData.month_start != this.weekNameData.month_end)
                week.innerHTML += ' ' + monthNames[this.weekNameData.month_start];
            week.innerHTML += ' - ' + this.weekNameData.day_end + ' ';
            week.innerHTML += monthNames[this.weekNameData.month_end];
            week.innerHTML += ', ';
            week.innerHTML += this.weekNameData.year_start;
            if(this.weekNameData.year_start != this.weekNameData.year_end)
                week.innerHTML += '-' + this.weekNameData.year_end;

            this.divMonthName.empty();
            this.divMonthName.appendChild(week);
        }else if(this.typeCalendar == 'days')
        {
            this.divMonthName.empty();
            this.divMonthName.innerHTML = this.day + ' ';
            this.divMonthName.innerHTML += monthNames[this.month];
            this.divMonthName.innerHTML += ', ' + this.year;
        }

    };

    this.createCalendarTable = function ()
    {
        var ob = this.o;
        var firstDay = new Date(this.year, this.month, 0);

        var startPosition = firstDay.getDay();
        var dni = this.getDays();
            dni += startPosition;
        var weekDay = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
        var table = document.createElement('table');
            table.className = 'month-table';

        this.divCalendarTable.empty();

        var tr = document.createElement('tr');
        for(var i = 0; i < weekDay.length; i++)
        {
            var th = document.createElement('th');
            th.appendChild(document.createTextNode(weekDay[i]));
            tr.appendChild(th);
        }
        table.appendChild(tr);

        tr = document.createElement('tr');
        for(var j = 0; j < startPosition; j++)
        {
            if(j % 7 == 0)
            {
                table.appendChild(tr);
                tr = document.createElement('tr');
            }

            var td = document.createElement('td');
            td.appendChild(document.createTextNode('   '));
            tr.appendChild(td);
        }

        for(var k = startPosition; k < dni; k++)
        {
            if(k % 7 == 0)
            {
                table.appendChild(tr);
                tr = document.createElement('tr');
            }
            const dayNr = parseInt(k - startPosition + 1);
            td = document.createElement('td');
            var dayNumber = document.createElement('span');
                dayNumber.innerHTML = dayNr;
                dayNumber.className = 'dayNumber';
            dayNumber.addEventListener('click', function ()
            {
                ob.day = dayNr;
                ob.typeCalendar = 'days';
                ob.createDayCalendar();
                ob.createMonthName();
            }, false);
            td.appendChild(dayNumber);
            td.className = 'day';
            td.addEventListener('click', function ()
            {
                new _Event(this, 'calendar');

            })
            if(this.year_now == this.year && this.month_now == this.month && this.day_now == dayNr)
                td.classList.add('current-day');
            td.onclick = function ()
            {
               /* var month = ((ob.month+1) < 10)? "0"+(ob.month+1) : ob.month+1;
                ob.textInput.value = ob.year + '-' + month + '-' + this.firstChild.nodeValue;*/
            };
            tr.appendChild(td);
        }

        table.appendChild(tr);

        this.divCalendarTable.appendChild(table);
    };

    this.createWeekCalendar = function ()
    {
        var ob = this.o;
        this.divCalendarTable.empty();
        var weekDayName = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
        var table = document.createElement('table');
            table.className = 'week-table';
        var mainDay = new Date(this.year, this.month, this.day);
        var dayInWeek = mainDay.getDay();

        var daysInMonth = this.getDays();
        if(dayInWeek == 0)
            dayInWeek = 7;
        var weekDay = this.day - dayInWeek;
        if(weekDay < 0)
        {
            this.month--;
            daysInMonth = this.getDays();
            weekDay += daysInMonth;
        }
        this.weekNameData.day_start = weekDay + 1;
        this.weekNameData.month_start = this.month;
        this.weekNameData.year_start = this.year;
        var tr = document.createElement('tr');
        tr.appendChild(document.createElement('th'));
        for(var i = 0; i < 7; i++)
        {
            weekDay++;
            if(weekDay > daysInMonth)
            {
                this.month++;
                if(this.month > 11)
                {
                    this.month = 0;
                    this.year++;
                }

                weekDay = 1;
            }
            var monthNumber = this.month + 1;
            var th = document.createElement('th');
                th.innerHTML = weekDayName[i] + ' ' + weekDay + '/' + monthNumber;

            if(this.year_now == this.year && this.month_now == this.month && this.day_now == weekDay)
                th.classList.add('current-day');
            tr.appendChild(th);

        }
        this.day = weekDay;
        this.weekNameData.day_end = weekDay;
        this.weekNameData.month_end = this.month;
        this.weekNameData.year_end= this.year;

        this.day = this.weekNameData.day_start;
        this.month = this.weekNameData.month_start;
        this.year = this.weekNameData.year_start;
        table.appendChild(tr);

        for(var j = 4; j <= 24; j++)
        {
            var tr_full = document.createElement('tr');
            var tr_half = document.createElement('tr');
            for(var k = 0; k < 8; k++)
            {
                var td_full = document.createElement('td');
                    td_full.innerHTML = ' ';
                var td_half = document.createElement('td');
                    td_half.innerHTML = 'a';
                if(k == 0)
                {
                    td_full.innerHTML = j + '.00';
                }
                tr_full.appendChild(td_full);
                tr_half.appendChild(td_half);


                td_full.className = 'weekCalendarTd';
                td_half.className = 'weekCalendarTd';

            }

            table.appendChild(tr_full);
            table.appendChild(tr_half);
        }
        this.divCalendarTable.appendChild(table);

    };

    this.createDayCalendar = function ()
    {
        var ob = this.o;
        this.divCalendarTable.empty();
        var weekDayName = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
        var table = document.createElement('table');
            table.className = 'days-table';
        var mainDay = new Date(this.year, this.month, this.day);
        var dayInWeek = mainDay.getDay();


        var tr = document.createElement('tr');
        var th = document.createElement('th');
        tr.appendChild(th);
        th = document.createElement('th');
        th.appendChild(document.createTextNode(weekDayName[dayInWeek]));
        tr.appendChild(th);
        table.appendChild(tr);
        for(var j = 4; j <= 24; j++)
        {
            var tr_full = document.createElement('tr');
            var tr_half = document.createElement('tr');
            for(var k = 0; k < 2; k++)
            {
                var td_full = document.createElement('td');
                td_full.innerHTML = ' ';
                var td_half = document.createElement('td');
                td_half.innerHTML = 'a';
                if(k == 0)
                {
                    td_full.innerHTML = j + '.00';
                }
                tr_full.appendChild(td_full);
                tr_half.appendChild(td_half);


                td_full.className = 'weekCalendarTd';
                td_half.className = 'weekCalendarTd';

            }

            table.appendChild(tr_full);
            table.appendChild(tr_half);
        }


        this.divCalendarTable.appendChild(table);
    };

    this.getDays = function ()
    {
        var days;
        var month = this.month + 1;
        if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)
        {
            days = 31;
        }else if(month == 4 || month == 6 || month == 9 || month == 11)
        {
            days = 30;
        }else if(month == 2)
        {
            if(this.leapYear())
            {
                days = 29;
            }else
            {
                days = 28;
            }
        }
        return days;
    };

    this.leapYear = function ()
    {
        if(((this.year % 4) == 0) && ((this.year % 100) != 0) || ((this.year % 400) == 0))
        {
            return true;
        }else
        {
            return false;
        }
    };

    this.init = function ()
    {
        var topPanel = document.createElement('div');
            topPanel.className = 'top-panel';

        this.divPlace = document.createElement('div');
        this.divPlace.className = _class;
        this.divPlace.style.position = 'absolute';

        this.divButtons = document.createElement('div');
        this.divButtons.className = 'buttons-next-prev';
        topPanel.appendChild(this.divButtons);

        this.divMonthName = document.createElement('div');
        this.divMonthName.className = 'month-name';
        topPanel.appendChild(this.divMonthName);
        this.createMonthName();

        this.divButtonsType = document.createElement('div');
        this.divButtonsType.className = 'buttons-type';
        topPanel.appendChild(this.divButtonsType);
        this.createButtons();


        this.divPlace.appendChild(topPanel);

        this.divCalendarTable = document.createElement('div');
        this.divCalendarTable.className = 'calendar-table';
        this.divPlace.appendChild(this.divCalendarTable);
        this.createCalendarTable();

        document.getElementById('divCalendar').appendChild(this.divPlace);
    };
    this.init();
    this.deleteCalendar = function() {
        this.divPlace.parentNode.removeChild(this.divPlace);
        delete this.o;
    }

};

Node.prototype.calendar = function() {

        this.value = "rrrr-mm-dd";
        this.calendarType = true;
        var input = document.createElement('input');
        input.type = 'button';
        input.className = 'calendar-icon';
        input.calendarExist = false;
        input.calendar = null;
        input.onclick = function() {
            if (!this.calendarExist) {

                this.calendarExist = true;
                return
            } else {
                this.calendar.deleteCalendar();
                this.calendarExist = false;
            }    return

        }
        this.insertAfter(input);

};

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM został wczytany");
    /*this.calendar = new _Calendar(this, 'calendar')*/
    new _Event(this, 'calendar');
});


















