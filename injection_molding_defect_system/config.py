# Optimal ranges for golden batch (customize based on part specs)
GOLDEN_BATCH = {
    'injection_pressure': (800, 1200),  # bar
    'melt_temperature': (200, 300),     # °C
    'mold_temperature': (40, 80),       # °C
    'cycle_time': (20, 60),             # seconds
    'holding_pressure': (500, 900),     # bar
    'cooling_time': (10, 30)            # seconds
}

# Defect types from prompt
DEFECT_TYPES = ['flash', 'sink marks', 'weld lines', 'short shots', 'burns', 'warping', 'voids', 'surface defects']

# Severity levels
SEVERITY_LEVELS = ['CRITICAL', 'MAJOR', 'MINOR', 'COSMETIC']
   