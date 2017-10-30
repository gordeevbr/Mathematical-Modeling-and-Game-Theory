# Searches for a saddle point in a zero-summ matrix using minimax strategy
import numpy
import math


def zero_summ_saddle_minimax(matrix):
    min_max = - math.inf
    min_max_index = 1

    max_min = math.inf
    max_min_index = 1

    shape = matrix.shape

    for i in range(0, shape[0]):
        min_val = math.inf
        min_index = -1
        for j in range(0, shape[1]):
            if matrix.item((i, j)) < min_val:
                min_val = matrix.item((i, j))
                min_index = [i, j]
        if min_val > min_max:
            min_max = min_val
            min_max_index = min_index

    for j in range(0, shape[1]):
        max_val = - math.inf
        max_index = -1
        for i in range(0, shape[0]):
            if matrix.item((i, j)) > max_val:
                max_val = matrix.item((i, j))
                max_index = [i, j]
        if max_val < max_min:
            max_min = max_val
            max_min_index = max_index

    if max_min <= min_max:
        return max_min_index
    else:
        return [-1, -1]


demo_matrix = numpy.matrix([[1, 2], [3, 4]])
result = zero_summ_saddle_minimax(demo_matrix)
print(demo_matrix)
print(result)
print(demo_matrix.item((result[0], result[1])))
print('--------')

demo_matrix = numpy.matrix([[1, 2, 5], [3, 3, 3], [5, 5, 3]])
result = zero_summ_saddle_minimax(demo_matrix)
print(demo_matrix)
print(result)
print(demo_matrix.item((result[0], result[1])))
print('--------')
