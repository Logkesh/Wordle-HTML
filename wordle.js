function construct_wordle() {
    for(let i = 0; i < 5; i++)
    {
        wordle[i] = Array(5);
        for(let j = 0; j < 5; j++)
        {
            wordle[i][j] = Array(2);
            wordle[i][j][0] = "&nbsp;";
            wordle[i][j][1] = "darkolivegreen";
        }
    }
}
function render_table() {
    let tab = document.getElementsByClassName("word")[0];
    let element = "";
    for(let i = 0; i < 5; i++)
    {
        element += "<tr>\n";
        for(let j = 0; j < 5; j++)
        {
            element += "<td class=\"cell\" style=\"background-color: "+wordle[i][j][1]+"\">"+ wordle[i][j][0] +"</td>\n";
            
        }
        element += "</tr>\n";
    }
    tab.innerHTML = element;
}

function render_keyboard() {
    let keys = document.getElementById("keys");
    let element = "";
    for(let i = 0; i < 28;i++)
    {
        if (i==10 || i==19 || i==26) element += "<br>";
        element += "<button type=\"button\"class=\"btn btn-lg btn-dark\" onclick=\"return process("+i+")\">" + char[i] + "</button>";
    }
    keys.innerHTML = element;

}

function process(char)
{
    if (char >= 0 && char <= 25) add(char);
    else if(char == 26) del();
    else if(char == 27) enter();
}

function add(i)
{
    if(col<5 && row < 5)
    {
        wordle[row][col][0] = char[i];
        col++;
        render_table();
    }
}

function del() {
    if(col > 0 && row < 5)
    {
        col--;
        wordle[row][col][0] = " ";
        render_table();
    }
}

function enter() {
    if (col == 5 && row < 5)
    {
        row++;
        col = 0;
        
        let re = wordle[row-1];
        let temp_sol = SOL;
        
        for(let i = 0; i < 5; i++)
        {
            wordle[row-1][i][1] = "black";
            for(let j = 0; j < 5; j++)
            {
                if (temp_sol[j] == re[i][0])
                {
                    if(i==j)
                    {
                        wordle[row-1][i][1] = "green";
                        break;
                    }
                    else
                    {
                        wordle[row-1][i][1] = "goldenrod";
                        break;
                    }
                }
            }
        }

        render_table();
        if(check_result())
        {
            document.getElementById("result").innerHTML = "<h2>Congrats</h2>";
            document.getElementById("result").style.backgroundColor = "green";
            row = 5;
        }
        else if(row == 5)
        {
            document.getElementById("result").innerHTML = "<h2>Answer: "+ SOL +"</h2>";
            document.getElementById("result").style.backgroundColor = "red";
        }

    }
}

function check_result() {
    for(let i = 0; i < 5; i++)
    {
        if(wordle[row-1][i][1] != "green") return false;
    }
    return true;
}

var wordle = Array(5);
var row = 0, col = 0;
var char = ['Q','W','E','R','T','Y','U','I','O','P',
                'A','S','D','F','G','H','J','K','L',
                'Z','X','C','V','B','N','M',
                "DEL","ENTER"];
var SOL = "WORLD"; // Set the solution
construct_wordle();
render_table();
render_keyboard();