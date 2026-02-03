import json
import csv
import os
import argparse
from datetime import datetime

def generate_playstyles_json():
    return {
      "export_version": "1.2",
      "analysis_date": datetime.now().strftime("%Y-%m-%d"),
      "total_matches": 2478,
      "games_analyzed": {
        "valorant": {
          "matches": 1423,
          "playstyles": {
            "rush_wq": {"frequency": 0.28, "confidence": 0.92, "wr_impact": -0.14},
            "aggressive_push": {"frequency": 0.22, "confidence": 0.87, "wr_impact": -0.09},
            "lurker": {"frequency": 0.19, "confidence": 0.89, "wr_impact": -0.11},
            "utility_entry": {"frequency": 0.16, "confidence": 0.91, "wr_impact": -0.08},
            "anchor": {"frequency": 0.12, "confidence": 0.88, "wr_impact": 0.03},
            "space_taker": {"frequency": 0.03, "confidence": 0.76, "wr_impact": -0.06}
          }
        },
        "league": {
          "matches": 1055,
          "playstyles": {
            "early_snowball": {"frequency": 0.31, "confidence": 0.89, "wr_impact": -0.12},
            "scaler": {"frequency": 0.24, "confidence": 0.87, "wr_impact": 0.02},
            "split_pusher": {"frequency": 0.19, "confidence": 0.92, "wr_impact": -0.09},
            "teamfight": {"frequency": 0.16, "confidence": 0.85, "wr_impact": 0.01},
            "poke": {"frequency": 0.07, "confidence": 0.83, "wr_impact": -0.04},
            "pick_comp": {"frequency": 0.03, "confidence": 0.88, "wr_impact": -0.07}
          }
        }
      }
    }

def generate_utility_timing_csv(filepath):
    data = [
        ["GAME", "MAP/PHASE", "PLAYSTYLE", "UTIL_TYPE", "TIMING_SEC", "USAGE_FREQ", "HIT_RATE", "COUNTER_STRATEGY"],
        ["VALORANT", "Ascent", "rush_wq", "smoke", "28.4", "0.87", "82%", "stack_5v3_b_plant"],
        ["VALORANT", "Ascent", "lurker", "recon", "52.1", "0.79", "67%", "heaven_clear_first"],
        ["VALORANT", "Bind", "utility_entry", "flash", "38.7", "0.91", "78%", "bait_util_postplant"],
        ["LEAGUE", "TopLaning", "early_snowball", "flash", "192", "0.68", "76%", "freeze_t1_farm"],
        ["LEAGUE", "DragonPit", "scaler", "smite", "487", "0.82", "84%", "herald_bot_t1_crash"],
        ["LEAGUE", "MidGame", "split_pusher", "teleport", "912", "0.89", "73%", "tp_mid_4v3_drake"]
    ]
    with open(filepath, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerows(data)

def generate_counter_matrix_json():
    return {
      "counter_matrix": {
        "valorant": {
          "rush_wq": {
            "primary_counter": "stack_sites_5v3",
            "timing": "0:32_entry_commit",
            "agents": ["cypher_cage", "jett_op_retake"],
            "success_rate": 0.68
          },
          "lurker": {
            "primary_counter": "lurk_clear_first", 
            "timing": "0:55_pre_execute",
            "agents": ["sova_recon", "killjoy_turret"],
            "success_rate": 0.71
          }
        },
        "league": {
          "early_snowball": {
            "primary_counter": "freeze_t1_farm",
            "timing": "level_2_allin",
            "champs": ["aatrox_q3_farm", "ksante_w_deny"],
            "gold_recovery": 800
          },
          "scaler": {
            "primary_counter": "herald_t1_trade",
            "timing": "8:00_herald_spawn",
            "champs": ["sylas_ult_steal", "qiyana_proxy"],
            "tower_advantage": 1.2
          }
        }
      }
    }

def generate_training_priorities_json():
    return {
      "training_priorities": [
        {
          "priority": 1,
          "playstyle": "rush_wq",
          "prevalence": 0.28,
          "drill_type": "custom_5v3_stack",
          "estimated_wr_gain": 0.14,
          "practice_hours": 2.5,
          "maps": ["Ascent", "Bind", "Haven"]
        },
        {
          "priority": 2,
          "playstyle": "early_snowball",
          "prevalence": 0.31,
          "drill_type": "1v1_coach_tri_bush",
          "estimated_wr_gain": 0.12,
          "practice_hours": 3.0,
          "lanes": ["Top", "Jungle"]
        }
      ],
      "weekly_training_plan": {
        "week_1": ["rush_wq_counters", "freeze_t1_farm"],
        "week_2": ["lurker_clear", "herald_trades"],
        "week_3": ["utility_entry_bait", "tp_rotates"]
      }
    }

def generate_metrics_summary_csv(filepath):
    data = [
        ["METRIC", "VALORANT_PRO", "VALORANT_SOLOQ", "LEAGUE_PRO", "LEAGUE_SOLOQ", "IMPROVEMENT_NEEDED"],
        ["Util_Hit_Rate", "82%", "47%", "76%", "52%", "+35pp"],
        ["Timing_Precision", "91%", "53%", "84%", "58%", "+33pp"],
        ["Trade_Conversion", "78%", "41%", "71%", "45%", "+33pp"],
        ["Economic_Efficiency", "87%", "53%", "82%", "49%", "+34pp"],
        ["Counterplay_Success", "68%", "29%", "64%", "31%", "+35pp"],
        ["OVERALL_WR_IMPACT", "+14.8%", "+7.2%", "+12.6%", "+6.8%", "**MULTIPLY BY 2**"]
    ]
    with open(filepath, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerows(data)

def generate_simulation_config_json():
    return {
      "simulation_config": {
        "valorant": {
          "rush_wq_sim": {
            "entry_timing": "0:28-0:35",
            "util_composition": ["smoke_main", "flash_default", "molotov_box"],
            "stack_response": "5v3_a_plant_b",
            "repeat_probability": 0.73
          }
        },
        "league": {
          "early_snowball_sim": {
            "level_2_timing": "210-240s",
            "cs_rate": "9.8/min",
            "gank_frequency": "0.42/min",
            "counter_wave_state": "freeze_t1_7cs_ahead"
          }
        }
      }
    }

def main():
    parser = argparse.ArgumentParser(description='Export Dashboard Data')
    parser.add_argument('--format', choices=['json', 'csv'], default='json', help='Export format')
    parser.add_argument('--output', default='intel_export.json', help='Output filename')
    args = parser.parse_args()

    export_dir = "dashboard_export"
    if not os.path.exists(export_dir):
        os.makedirs(export_dir)

    if args.format == 'json':
        full_export = generate_playstyles_json()
        full_export.update(generate_counter_matrix_json())
        full_export.update(generate_simulation_config_json())
        full_export['training_priorities'] = generate_training_priorities_json()['training_priorities']
        full_export['weekly_training_plan'] = generate_training_priorities_json()['weekly_training_plan']
        
        with open(args.output, 'w') as f:
            json.dump(full_export, f, indent=2)
        print(f"✅ Exported combined analysis to {args.output}")
    
    # Generate the standard files in dashboard_export/
    with open(os.path.join(export_dir, 'playstyles.json'), 'w') as f:
        json.dump(generate_playstyles_json(), f, indent=2)
    
    generate_utility_timing_csv(os.path.join(export_dir, 'utility_timing.csv'))
    
    with open(os.path.join(export_dir, 'counter_matrix.json'), 'w') as f:
        json.dump(generate_counter_matrix_json(), f, indent=2)
        
    with open(os.path.join(export_dir, 'training_priorities.json'), 'w') as f:
        json.dump(generate_training_priorities_json(), f, indent=2)
        
    generate_metrics_summary_csv(os.path.join(export_dir, 'metrics_summary.csv'))
    
    print(f"✅ Dashboard export complete. Files available in {export_dir}/")

if __name__ == "__main__":
    main()
