#!/usr/bin/env python3
"""
Data Comparison Tool
Analyzes and compares two CSV datasets to identify differences.
"""

import pandas as pd
import sys
from pathlib import Path

def analyze_csv_structure(df, name):
    """Analyze the structure of a CSV dataset."""
    print(f"\n=== {name} Dataset Analysis ===")
    print(f"Shape: {df.shape[0]} rows, {df.shape[1]} columns")
    print(f"Columns: {list(df.columns)}")
    
    # Check for missing values
    missing = df.isnull().sum()
    if missing.any():
        print(f"Missing values:\n{missing[missing > 0]}")
    else:
        print("No missing values found")
    
    # Data types
    print(f"Data types:\n{df.dtypes}")
    
    return df

def compare_datasets(old_file, new_file):
    """Compare two CSV datasets and identify differences."""
    try:
        # Read the datasets
        print("Reading datasets...")
        old_df = pd.read_csv(old_file, header=None)
        new_df = pd.read_csv(new_file, header=None)
        
        # Assign column names based on the structure observed
        columns = ['id', 'user_id', 'field3', 'field4', 'field5', 'field6', 'date', 'value']
        
        if len(old_df.columns) == len(columns):
            old_df.columns = columns
        if len(new_df.columns) == len(columns):
            new_df.columns = columns
            
        # Analyze structures
        old_df = analyze_csv_structure(old_df, "OLD")
        new_df = analyze_csv_structure(new_df, "NEW")
        
        print("\n=== COMPARISON RESULTS ===")
        
        # Shape comparison
        print(f"Row count change: {old_df.shape[0]} → {new_df.shape[0]} ({new_df.shape[0] - old_df.shape[0]:+d})")
        print(f"Column count change: {old_df.shape[1]} → {new_df.shape[1]} ({new_df.shape[1] - old_df.shape[1]:+d})")
        
        # Column comparison
        old_cols = set(old_df.columns)
        new_cols = set(new_df.columns)
        
        if old_cols != new_cols:
            added_cols = new_cols - old_cols
            removed_cols = old_cols - new_cols
            
            if added_cols:
                print(f"Added columns: {list(added_cols)}")
            if removed_cols:
                print(f"Removed columns: {list(removed_cols)}")
        else:
            print("Column structure unchanged")
        
        # Find common columns for detailed comparison
        common_cols = old_cols.intersection(new_cols)
        
        if common_cols:
            print(f"\nAnalyzing common columns: {list(common_cols)}")
            
            # Set index to 'id' if it exists for easier comparison
            if 'id' in common_cols:
                old_indexed = old_df.set_index('id')
                new_indexed = new_df.set_index('id')
                
                # Find added/removed records
                old_ids = set(old_indexed.index)
                new_ids = set(new_indexed.index)
                
                added_ids = new_ids - old_ids
                removed_ids = old_ids - new_ids
                common_ids = old_ids.intersection(new_ids)
                
                print(f"\nRecord changes:")
                print(f"  Added records: {len(added_ids)}")
                print(f"  Removed records: {len(removed_ids)}")
                print(f"  Common records: {len(common_ids)}")
                
                if added_ids:
                    print(f"  Added IDs (first 5): {list(added_ids)[:5]}")
                if removed_ids:
                    print(f"  Removed IDs (first 5): {list(removed_ids)[:5]}")
                
                # Check for changes in common records
                if common_ids:
                    changes_found = False
                    for col in common_cols:
                        if col != 'id':  # Skip the index column
                            old_vals = old_indexed.loc[list(common_ids), col]
                            new_vals = new_indexed.loc[list(common_ids), col]
                            
                            # Compare values
                            different_mask = old_vals != new_vals
                            if different_mask.any():
                                changes_found = True
                                changed_ids = old_vals[different_mask].index.tolist()
                                print(f"\n  Column '{col}' changes in {len(changed_ids)} records:")
                                
                                # Show first few changes
                                for i, record_id in enumerate(changed_ids[:3]):
                                    old_val = old_vals.loc[record_id]
                                    new_val = new_vals.loc[record_id]
                                    print(f"    {record_id}: '{old_val}' → '{new_val}'")
                                
                                if len(changed_ids) > 3:
                                    print(f"    ... and {len(changed_ids) - 3} more")
                    
                    if not changes_found:
                        print("\n  No value changes found in common records")
            
            # Summary statistics comparison
            print(f"\n=== SUMMARY STATISTICS ===")
            for col in common_cols:
                if old_df[col].dtype in ['int64', 'float64']:
                    old_stats = old_df[col].describe()
                    new_stats = new_df[col].describe()
                    
                    print(f"\nColumn '{col}':")
                    print(f"  Mean: {old_stats['mean']:.2f} → {new_stats['mean']:.2f}")
                    print(f"  Min:  {old_stats['min']:.2f} → {new_stats['min']:.2f}")
                    print(f"  Max:  {old_stats['max']:.2f} → {new_stats['max']:.2f}")
        
        return old_df, new_df
        
    except Exception as e:
        print(f"Error comparing datasets: {e}")
        return None, None

def main():
    """Main function to run the comparison."""
    old_file = "old_data.csv"
    new_file = "new_data.csv"
    
    # Check if files exist
    if not Path(old_file).exists():
        print(f"Error: {old_file} not found")
        return
    
    if not Path(new_file).exists():
        print(f"Error: {new_file} not found")
        print("Please provide the new data in a file called 'new_data.csv'")
        return
    
    # Run comparison
    old_df, new_df = compare_datasets(old_file, new_file)
    
    if old_df is not None and new_df is not None:
        print("\n=== COMPARISON COMPLETE ===")
        print("Use the DataFrames 'old_df' and 'new_df' for further analysis if needed.")

if __name__ == "__main__":
    main()