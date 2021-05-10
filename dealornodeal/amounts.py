from typing import List

current = [1, 5, 10, 25, 50, 75, 100, 200, 300, 400, 500, 750, 1000, 5000, 10000, 25000, 50000, 75000, 100000, 200000, 300000, 400000, 500000, 750000, 1000000]
twohundred = [0.5, 1, 2, 5, 10, 25, 50, 75, 100, 150, 250, 500, 750, 1000, 1500, 2000, 3000, 5000, 7500, 10000, 15000, 25000, 50000, 75000, 100000, 200000]
twomillion = [0.5, 1, 2, 5, 10, 25, 50, 75, 100, 200, 300, 500, 750, 1000, 2500, 5000, 7500, 10000, 25000, 50000, 75000, 100000, 250000, 500000, 1000000, 2000000]
fivehundred = [0.01, 1, 5, 10, 25, 50, 100, 200, 300, 400, 500, 1000, 2500, 5000, 7500, 10000, 25000, 50000, 75000, 100000, 250000, 500000]

def proportions():
    for spread in [my_proportions, current, twohundred, fivehundred, twomillion]:
        print(f'{spread=}')
        for value in spread:
            print(f'{value / spread[-1]}', end='  ')
        print('\n\n')

current_proportions= [1e-06, 5e-06, 1e-05, 2.5e-05, 5e-05, 7.5e-05, 0.0001, 0.0002, 0.0003, 0.0004, 0.0005, 0.00075, 0.001, 0.005, 0.01, 0.025, 0.05, 0.075, 0.1, 0.2, 0.3, 0.4, 0.5, 0.75, 1.0, ]
twohundred_proportions= [2.5e-06, 5e-06, 1e-05, 2.5e-05, 5e-05, 0.000125, 0.00025, 0.000375, 0.0005, 0.00075, 0.00125, 0.0025, 0.00375, 0.005, 0.0075, 0.01, 0.015, 0.025, 0.0375, 0.05, 0.075, 0.125, 0.25, 0.375, 0.5, 1.0, ]
fivehundred_proportions= [2e-08, 2e-06, 1e-05, 2e-05, 5e-05, 0.0001, 0.0002, 0.0004, 0.0006, 0.0008, 0.001, 0.002, 0.005, 0.01, 0.015, 0.02, 0.05, 0.1, 0.15, 0.2, 0.5, 1.0, ]
twomillion_proportions= [2.5e-07, 5e-07, 1e-06, 2.5e-06, 5e-06, 1.25e-05, 2.5e-05, 3.75e-05, 5e-05, 0.0001, 0.00015, 0.00025, 0.000375, 0.0005, 0.00125, 0.0025, 0.00375, 0.005, 0.0125, 0.025, 0.0375, 0.05, 0.125, 0.25, 0.5, 1.0, ]

my_values_based_on_200 = [0.05, 0.2, 0.5, 0.75, 1.0, 1.5, 2.0, 2.5, 3.0, 5.0, 7.5, 10.0, 12.5, 15.0, 20.0, 25.0, 50.0,
                          75.0, 100.0, 125.0, 150.0, 200.0]
my_initial_proportions = [0.00025, 0.001, 0.0025, 0.00375, 0.005, 0.0075, 0.01, 0.0125, 0.015, 0.025, 0.0375, 0.05,
                          0.0625, 0.075, 0.1, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 1.0]
my_proportions = [0.00025, 0.0025, 0.005, 0.0075, 0.01, 0.0125, 0.015, 0.025, 0.0375, 0.05, 0.0625, 0.075, 0.1, 0.125,
                  0.2, 0.25, 0.3, 0.375, 0.5, 0.625, 0.75, 1.0]


def generate_prizes(max_prize) -> List[int]:
    """
    Generates list of prizes for display.

    Generates a list of rounded values in numerical order from the max_prize,
    then interleaves halves of the list, such that the values are displayed in
    order in two columns going downwards:
                                            1 4
                                            2 5
                                            3 6
    So [1, 2, 3, 4, 5, 6] is transformed to [1, 4, 2, 5, 3, 6].

    :param max_prize: int
    :return: List[int]
    """
    ordered_prizes = [round(proportion * max_prize, 2) for proportion in my_proportions]
    lower, higher = ordered_prizes[:11], ordered_prizes[11:]
    interleaved_prizes = [value for pair in zip(lower, higher) for value in pair]
    return interleaved_prizes


"""
export FLASK_ENV=development
export FLASK_DEBUG=1
export FLASK_APP=dealornodeal
export FLASK_RUN_HOST=0.0.0.0
export FLASK_RUN_PORT=1111
"""


def test_generate_prizes():
    test_prizes = [0.05, 15.0, 0.5, 20.0, 1.0, 25.0, 1.5, 40.0, 2.0, 50.0, 2.5, 60.0, 3.0, 75.0, 5.0, 100.0, 7.5, 125.0,
                   10.0, 150.0, 12.5, 200.0]

    assert generate_prizes(200) == test_prizes
