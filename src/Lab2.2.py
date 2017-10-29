# Brown–Robinson method
import numpy
import math


def brown_robinson(matrix):
    return [-1, -1]


demo_matrix = numpy.matrix([[1, 2], [3, 4]])
result = brown_robinson(demo_matrix)
print(demo_matrix)
print(result)
print(demo_matrix.item((result[0], result[1])))
print('--------')

demo_matrix = numpy.matrix([[1, 2, 3], [3, 4, 3], [5, 4, 3]])
result = brown_robinson(demo_matrix)
print(demo_matrix)
print(result)
print(demo_matrix.item((result[0], result[1])))
print('--------')
