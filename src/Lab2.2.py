# Brown–Robinson method
import numpy
import math

DEBUG = True
CONVERGENCE_DELTA = 0.1


def count_p1_total_vector(player1_vector, matrix):
    shape = matrix.shape
    res = [0] * shape[1]
    for i in range(0, shape[0]):
        for j in range(0, shape[1]):
            res[j] = res[j] + matrix.item((i, j)) * player1_vector[i]
    return res


def count_p2_total_vector(player2_vector, matrix):
    shape = matrix.shape
    res = [0] * shape[0]
    for j in range(0, shape[1]):
        for i in range(0, shape[0]):
            res[i] = res[i] + matrix.item((i, j)) * player2_vector[j]
    return res


def is_converged(player1_res_vector, player2_res_vector, matrix, iteration):
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

    high = max_value / iteration
    low = min_value / iteration

    if DEBUG:
        print("Higher: %8.4f, Lower: %8.4f, Delta: %8.4f" % (high, low, math.fabs(high - low)))

    return math.fabs(high - low) < CONVERGENCE_DELTA


def brown_robinson_step(player1_res_vector, player2_res_vector, matrix):
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

    return [max_index, min_index]


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

    iteration = 1
    result = brown_robinson_step(player1_res_vector, player2_res_vector, matrix)

    while iteration < max(shape[0], shape[1]) * 10 \
            and not is_converged(player1_res_vector, player2_res_vector, matrix, iteration):
        iteration += 1
        result = brown_robinson_step(player1_res_vector, player2_res_vector, matrix)

    if is_converged(player1_res_vector, player2_res_vector, matrix, iteration):
        return result
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
