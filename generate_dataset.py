import csv
import json
import random
import os

# Configuration
YEARS = list(range(2000, 2026))
SECTORS = ["Energy", "Transportation", "Agriculture", "Industry", "Waste Management", "Residential"]

# 50 Countries with ISO codes and baseline profile
# Profile: (Baseline Total CO2 in 2000 in Million Metric Tons, Annual Growth Rate, Population in 2000 in Millions, Population Growth Rate)
COUNTRY_PROFILES = {
    "Algeria": ("DZA", 100, 0.02, 31, 0.015),
    "Argentina": ("ARG", 140, 0.01, 37, 0.01),
    "Australia": ("AUS", 350, -0.005, 19, 0.012),
    "Austria": ("AUT", 65, -0.01, 8, 0.005),
    "Belgium": ("BEL", 115, -0.01, 10, 0.005),
    "Brazil": ("BRA", 330, 0.02, 175, 0.01),
    "Bulgaria": ("BGR", 45, -0.005, 8, -0.007),
    "Canada": ("CAN", 550, -0.002, 31, 0.01),
    "Chile": ("CHL", 55, 0.025, 15, 0.01),
    "China": ("CHN", 3500, 0.06, 1260, 0.005),
    "Colombia": ("COL", 60, 0.015, 40, 0.012),
    "Croatia": ("HRV", 20, -0.005, 4.5, -0.003),
    "Cyprus": ("CYP", 7, 0.01, 0.7, 0.01),
    "Czech Republic": ("CZE", 120, -0.01, 10, 0.001),
    "Denmark": ("DNK", 55, -0.02, 5.3, 0.004),
    "Egypt": ("EGY", 130, 0.03, 70, 0.02),
    "Estonia": ("EST", 15, -0.005, 1.4, -0.004),
    "Finland": ("FIN", 55, -0.015, 5.2, 0.003),
    "France": ("FRA", 400, -0.015, 61, 0.005),
    "Germany": ("DEU", 850, -0.015, 82, 0.001),
    "Greece": ("GRC", 95, -0.005, 11, 0.002),
    "Hungary": ("HUN", 60, -0.01, 10, -0.002),
    "India": ("IND", 1000, 0.05, 1050, 0.013),
    "Indonesia": ("IDN", 300, 0.04, 211, 0.012),
    "Iran": ("IRN", 350, 0.035, 66, 0.012),
    "Ireland": ("IRL", 45, -0.005, 3.8, 0.015),
    "Italy": ("ITA", 450, -0.01, 57, 0.003),
    "Japan": ("JPN", 1200, -0.01, 127, 0.001),
    "Kazakhstan": ("KAZ", 150, 0.02, 15, 0.005),
    "Malaysia": ("MYS", 130, 0.04, 23, 0.018),
    "Mexico": ("MEX", 380, 0.01, 99, 0.013),
    "Morocco": ("MAR", 35, 0.03, 29, 0.012),
    "Netherlands": ("NLD", 170, -0.01, 16, 0.004),
    "New Zealand": ("NZL", 35, 0.005, 3.9, 0.01),
    "Nigeria": ("NGA", 80, 0.035, 122, 0.025),
    "Norway": ("NOR", 40, -0.005, 4.5, 0.008),
    "Pakistan": ("PAK", 110, 0.04, 138, 0.02),
    "Philippines": ("PHL", 75, 0.035, 78, 0.017),
    "Poland": ("POL", 310, -0.005, 38, 0.001),
    "Portugal": ("PRT", 65, -0.01, 10, 0.003),
    "Romania": ("ROU", 95, -0.01, 22, -0.005),
    "Russia": ("RUS", 1500, 0.005, 147, -0.002),
    "Saudi Arabia": ("SAU", 300, 0.04, 21, 0.03),
    "Slovakia": ("SVK", 40, -0.01, 5.4, 0.001),
    "Slovenia": ("SVN", 15, -0.005, 2, 0.002),
    "South Africa": ("ZAF", 380, 0.01, 45, 0.013),
    "South Korea": ("KOR", 450, 0.015, 47, 0.005),
    "Spain": ("ESP", 300, -0.01, 40, 0.007),
    "Sweden": ("SWE", 55, -0.02, 8.9, 0.005),
    "Switzerland": ("CHE", 45, -0.015, 7.2, 0.007),
    "Turkey": ("TUR", 220, 0.03, 63, 0.013),
    "United Kingdom": ("GBR", 550, -0.02, 59, 0.005),
    "United States": ("USA", 5800, -0.008, 282, 0.009),
    "United Arab Emirates": ("ARE", 80, 0.045, 3, 0.08),
    "Uzbekistan": ("UZB", 120, 0.01, 25, 0.015),
    "Viet Nam": ("VNM", 50, 0.07, 80, 0.01)
}

# Sector distribution (approximate)
SECTOR_WEIGHTS = {
    "Energy": 0.40,
    "Transportation": 0.20,
    "Agriculture": 0.15,
    "Industry": 0.15,
    "Waste Management": 0.05,
    "Residential": 0.05
}

def generate():
    rows = []
    
    for country, profile in COUNTRY_PROFILES.items():
        iso, base_emissions, emissions_growth, base_pop, pop_growth = profile
        
        current_emissions = base_emissions
        current_pop = base_pop
        
        for year in YEARS:
            # Add some randomness to growth
            year_emissions_growth = emissions_growth + random.uniform(-0.02, 0.02)
            # After 2020, adjust for post-pandemic and climate policies
            if year > 2020:
                if emissions_growth > 0:
                    year_emissions_growth *= 0.8 # Slowing growth
                else:
                    year_emissions_growth *= 1.2 # Faster reduction
            
            # Special case for 2020 (Pandemic dip)
            if year == 2020:
                year_emissions = current_emissions * 0.93 # 7% drop globally on average
            else:
                year_emissions = current_emissions * (1 + year_emissions_growth)
            
            current_emissions = year_emissions
            
            year_pop = current_pop * (1 + pop_growth)
            current_pop = year_pop
            
            # Sector breakdown
            country_total = year_emissions * 1000000 # Convert Million Metric Tons to Metric Tons
            
            sector_data = []
            for sector in SECTORS:
                # Add some sector-specific variance
                weight = SECTOR_WEIGHTS[sector] * random.uniform(0.9, 1.1)
                sector_data.append((sector, weight))
            
            # Normalize weights
            total_weight = sum(w for s, w in sector_data)
            sector_data = [(s, w / total_weight) for s, w in sector_data]
            
            per_capita = country_total / (year_pop * 1000000)
            
            for sector, weight in sector_data:
                sector_emissions = country_total * weight
                rows.append({
                    "Country Name": country,
                    "ISO Country Code": iso,
                    "Year": year,
                    "Sector": sector,
                    "CO2 Emissions (metric tons)": round(sector_emissions, 2),
                    "Per Capita Emissions (metric tons per person)": round(per_capita, 4),
                    "Percentage Contribution (%)": round(weight * 100, 2),
                    "Data Source": "Synthetic Climate Data v1.0"
                })

    # Save to CSV
    csv_file = "carbon_emissions_2000_2025.csv"
    fieldnames = ["Country Name", "ISO Country Code", "Year", "Sector", "CO2 Emissions (metric tons)", "Per Capita Emissions (metric tons per person)", "Percentage Contribution (%)", "Data Source"]
    
    with open(csv_file, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)
    
    print(f"Generated {len(rows)} records in {csv_file}")
    
    # Save to JSON for frontend
    json_data = {}
    for row in rows:
        country = row["Country Name"]
        if country not in json_data:
            json_data[country] = {
                "iso": row["ISO Country Code"],
                "data": []
            }
        json_data[country]["data"].append({
            "year": row["Year"],
            "sector": row["Sector"],
            "emissions": row["CO2 Emissions (metric tons)"],
            "perCapita": row["Per Capita Emissions (metric tons per person)"],
            "percentage": row["Percentage Contribution (%)"]
        })
    
    # Ensure directory exists
    json_dir = os.path.join("frontend", "src", "assets", "data")
    if not os.path.exists(json_dir):
        os.makedirs(json_dir)
        
    json_file = os.path.join(json_dir, "carbon_emissions.json")
    with open(json_file, "w") as f:
        json.dump(json_data, f, indent=2)
    
    print(f"Generated JSON data in {json_file}")

if __name__ == "__main__":
    generate()
