# Brown–Robinson method
import numpy
import math

DEBUG = True
CONVERGENCE_DELTA = 0.1


def count_p1_total_vector(player1_vector, matrix):
    shape = matrix.shape
    res = [0] * shape[1]
    for i in range(0, len(player1_vector)):
        for j in range(0, shape[1]):
            res[j] = res[j] + matrix.item((player1_vector[i], j))
    return res


def count_p2_total_vector(player2_vector, matrix):
    shape = matrix.shape
    res = [0] * shape[0]
    for j in range(0, len(player2_vector)):
        for i in range(0, shape[0]):
            res[i] = res[i] + matrix.item((i, player2_vector[j]))
    return res


def is_converged(player1_res_vector, player2_res_vector, matrix):
    shape = matrix.shape

    p2_total = count_p2_total_vector(player2_res_vector, matrix)

    max_value = -math.inf
    for i in range(0, len(p2_total)):
        if p2_total[i] > max_value:
            max_value = p2_total[i]

    p1_total = count_p1_total_vector(player1_res_vector, matrix)

    min_value = math.inf
    for j in range(0, len(p1_total)):
        if p1_total[j] < min_value:
            min_value = p1_total[j]

    low = max_value / len(p2_total)
    high = min_value / len(p1_total)

    if DEBUG:
        print("Higher: {}, Lower: {}, Delta: {}", high, low, high - low)

    return math.fabs(high - low) < CONVERGENCE_DELTA


def brown_robinson_step(player1_res_vector, player2_res_vector, matrix):
    shape = matrix.shape

    p2_total = count_p2_total_vector(player2_res_vector, matrix)

    max_value = -math.inf
    max_index = -1
    for i in range(0, len(p2_total)):
        if p2_total[i] > max_value:
            max_value = p2_total[i]
            max_index = i
    player1_res_vector[max_index] += 1

    p1_total = count_p1_total_vector(player1_res_vector, matrix)

    min_value = math.inf
    min_index = -1
    for j in range(0, len(p1_total)):
        if p1_total[j] < min_value:
            min_value = p1_total[j]
            min_index = j
    player2_res_vector[min_index] += 1


def brown_robinson(matrix):
    shape = matrix.shape

    min_max = - math.inf
    min_max_index = 1

    player1_res_vector = [0] * shape[0]
    player2_res_vector = [0] * shape[1]

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

    min_max_index = min_max_index[0]
    player1_res_vector[min_max_index] = 1

    min_val = math.inf
    min_index = -1
    for j in range(0, shape[1]):
        if matrix.item((min_max_index, j)) < min_val:
            min_val = matrix.item((min_max_index, j))
            min_index = j

    player2_res_vector[min_index] = 1

    iteration = 0

    while iteration < max(shape[0], shape[1]) * 10 and not is_converged(player1_res_vector, player2_res_vector, matrix):
        brown_robinson_step(player1_res_vector, player2_res_vector, matrix)

    if is_converged(player1_res_vector, player2_res_vector, matrix):
        return [player1_res_vector[len(player1_res_vector) - 1], player2_res_vector[len(player2_res_vector) - 1]]
    else:
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
