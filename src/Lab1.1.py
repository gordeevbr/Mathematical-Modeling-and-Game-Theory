import random
import matplotlib.pyplot as plt
import numpy as np
import sys

ITERATIONS = 10000
RESOLUTION = 100


def clamp(n, smallest, largest): return max(smallest, min(n, largest))


def simulate(n, m, change):
    assert m < n - 1
    assert n > 0

    indexes = [i for i in range(n)]
    random.shuffle(indexes, lambda: random.uniform(0, 1))

    doors = [False] * n
    for i in range(0, m):
        doors[indexes[i]] = True

    choice_player = indexes[random.randint(0, n - 1)]
    indexes.remove(choice_player)

    for i in range(0, n - 1):
        if not doors[indexes[i]]:
            del indexes[i]
            break

    if change:
        choice_player = indexes[random.randint(0, n - 3)]

    return doors[choice_player]


def simulate_times(n, m, change, times):
    got_car = 0
    got_goat = 0
    for i in range(0, times):
        if simulate(n, m, change):
            got_car += 1
        else:
            got_goat += 1
    return [got_car, got_goat]


def print_res(doors, cars, change, times, results):
    print(f"For doors: {doors}, cars: {cars}, changing door: {change}, "
          f"iterations: {times}, win probability: {results[0]/times}")


def simulate_for_each_and_print():
    for doors in range(3, 11):
        for cars in range(1, doors - 1):
            res_change = simulate_times(doors, cars, True, ITERATIONS)
            res_stay = simulate_times(doors, cars, False, ITERATIONS)
            if res_change[0]/ITERATIONS < res_stay[0]/ITERATIONS:
                break
            else:
                print_res(doors, cars, True, ITERATIONS, res_change)
                print_res(doors, cars, False, ITERATIONS, res_stay)

    for doors in range(20, 1000, 10):
        for cars in range(10, doors - 2, 10):
            res_change = simulate_times(doors, cars, True, ITERATIONS)
            res_stay = simulate_times(doors, cars, False, ITERATIONS)
            if res_change[0]/ITERATIONS < res_stay[0]/ITERATIONS:
                break
            else:
                print_res(doors, cars, True, ITERATIONS, res_change)
                print_res(doors, cars, False, ITERATIONS, res_stay)


def simulate_for_each_and_show_image_binary():
    img = np.zeros((RESOLUTION, RESOLUTION, 3))
    for doors in range(3, RESOLUTION):
        for cars in range(1, doors - 2):
            sys.stdout.write(f"\r({doors},{cars})/({RESOLUTION},{RESOLUTION})")
            sys.stdout.flush()
            res1 = simulate_times(doors, cars, True, ITERATIONS)
            res2 = simulate_times(doors, cars, False, ITERATIONS)
            img[doors][cars][0] = 1 if res1[0] < res2[0] else 0
            img[doors][cars][1] = 1 if res1[0] > res2[0] else 0
            img[doors][cars][2] = 0
    plt.imshow(img)
    plt.show()


def simulate_for_each_and_show_image_fused():
    img = np.zeros((RESOLUTION, RESOLUTION, 3))
    for doors in range(3, RESOLUTION):
        for cars in range(1, doors - 2):
            sys.stdout.write(f"\r({doors},{cars})/({RESOLUTION},{RESOLUTION})")
            sys.stdout.flush()
            res1 = simulate_times(doors, cars, True, ITERATIONS)
            res2 = simulate_times(doors, cars, False, ITERATIONS)
            img[doors][cars][0] = clamp((res1[0] - res2[0]) * 10 / ITERATIONS, 0, 1)
            img[doors][cars][1] = 0
            img[doors][cars][2] = 0
    plt.imshow(img)
    plt.show()

simulate_for_each_and_show_image_fused()
