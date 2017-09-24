import matplotlib.pyplot as plt
import numpy
import math

ITERATIONS = 1000000


def simulate(iterations):
    en1 = numpy.random.exponential(1/3, iterations)
    en2 = numpy.multiply(2, en1)
    for i in range(0, iterations):
        if numpy.random.choice([True, False]):
            temp = en1[i]
            en1[i] = en2[i]
            en2[i] = temp

    res = [False] * iterations
    for i in range(0, iterations):
        res[i] = en2[i] > en1[i]

    return en1, en2, res


def plot(end, step):
    en1, en2, res = simulate(ITERATIONS)

    max_index = int(end/step)
    acculumator = [0] * max_index
    for i in range(0, len(acculumator)):
        acculumator[i] = [0, 0]

    for i in range(0, len(en1)):
        index = int(math.floor(en1[i] / step))
        index = min([index, max_index - 1])
        acculumator[index][0] += 1
        if res[i]:
            acculumator[index][1] += 1

    total = [0] * max_index
    for i in range(0, len(acculumator)):
        if acculumator[i][0] > 0:
            total[i] = acculumator[i][1] / acculumator[i][0]
        else:
            total[i] = 0

    plt.plot(numpy.arange(0.0, end, step), total)
    plt.show()


plot(10.0, 0.2)
