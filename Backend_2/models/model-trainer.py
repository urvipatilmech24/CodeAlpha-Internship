import os
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
import joblib

def train_and_save_model():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_path = os.path.join(base_dir, "data", "Advertising.csv")

    if not os.path.exists(data_path):
        print(f"Error: Dataset missing at {data_path}")
        return

    # Data Cleaning & Transformation
    df = pd.read_csv(data_path)
    if 'Unnamed: 0' in df.columns:
        df = df.drop(columns=['Unnamed: 0'])

    # Clean whitespace and handle potential missing values
    df.columns = df.columns.str.strip()
    df = df.dropna()

    # Feature Engineering
    df['Total_Spend'] = df['TV'] + df['Radio'] + df['Newspaper']
    df['TV_Ratio'] = df['TV'] / (df['Total_Spend'] + 1e-5)
    df['Radio_Ratio'] = df['Radio'] / (df['Total_Spend'] + 1e-5)

    X = df[['TV', 'Radio', 'Newspaper', 'Total_Spend', 'TV_Ratio', 'Radio_Ratio']]
    y = df['Sales']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    r2 = r2_score(y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))

    model_path = os.path.join(base_dir, "models", "sales_model.pkl")
    joblib.dump(model, model_path)

    print(f"Model trained successfully! R2 Score: {round(r2, 4)}, RMSE: {round(rmse, 4)}")
    print(f"Saved binary to {model_path}")

if __name__ == "__main__":
    train_and_save_model()