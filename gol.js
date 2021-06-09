var width = 75
var height = 75
var matrix = new Array(height).fill(0).map(() => new Array(width).fill(false))
var matrixCopy = new Array(height).fill(0).map(() => new Array(width).fill(false))

var minNeighbors = 2
var maxNeighbors = 3
var spawnNeighbors = 3

dead = "background: black;"
alive = "background: white;"

function init()
{
	var cellsize = "10px"
	var table = document.createElement("table")
	table.id = "board"
	table.style = "border: 1px solid black;"
	for(i = 0; i < height; i++)
	{
		row = table.insertRow()
		for(j = 0; j < width; j++)
		{
			rand = Boolean(Math.round(Math.random() - 0.2))
			matrix[i][j] = rand
			cell = row.insertCell()
			cell.width = cellsize
			cell.height = cellsize
			if(matrix[i][j])
			{
				cell.style = alive
			}
			else
			{
				cell.style = dead
			}
		}
	}
	document.body.appendChild(table)
	
	window.setInterval(update, 1)
}



function copyMatrix()
{
	// for(i = 0; i < height; i++)
	// {
		// for(j = 0; j < width; j++)
		// {
			// matrix[i][j] = matrixCopy[i][j]
		// }
	// }
	
	for(i = 0; i < height; i++)
	{
		matrix[i] = [...matrixCopy[i]]
	}
}

function update()
{
	table = document.getElementById("board")
	for(i = 0; i < height; i++)
		{
			for(j = 0; j < width; j++)
			{
				
				numNeighbors = countNeighbors(i,j)
				if(matrix[i][j])
				{
					if(numNeighbors > maxNeighbors || numNeighbors < minNeighbors)
					{
						matrixCopy[i][j] = false
					}
					else{
						matrixCopy[i][j] = matrix[i][j]
					}
				} else{
					if(numNeighbors == spawnNeighbors)
					{
						matrixCopy[i][j] = true
					}
					else{
						matrixCopy[i][j] = matrix[i][j]
					}
				}
			}
		}
		
	copyMatrix()
	
	draw()
}

function draw()
{	
	for(i = 0; i < height; i++)
		{
			for(j = 0; j < width; j++)
			{
				cell = table.rows[i].cells[j]
				if(matrix[i][j])
				{
					cell.style = dead
				}
				else{
					cell.style = alive
				}
			}
		}
}

function countNeighbors(i,j)
{
	neighbors = 0
	for(ioffset = -1; ioffset <= 1; ioffset++)
	{
		for(joffset = -1; joffset <= 1; joffset++)
		{
			if(ioffset == 0 && joffset == 0)
			{
				continue
			}
			if(i+ioffset < 0 || i+ioffset >= height)
			{
				continue
			}
			else if(j+joffset < 0 || j+joffset >= width){
				continue
			}
			if(matrix[i+ioffset][j+joffset])
			{
				neighbors = neighbors + 1
			}
		}
	}
	
	return neighbors
}