<?php

namespace Database\Seeders;

use App\Models\District;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DistrictSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = \Illuminate\Support\Facades\File::get("database/data/districts.json");
        $data = json_decode($json);
        foreach ($data as $district) {
            District::updateOrCreate([
                'name' => $district->name,
                'state_id' => $district->state_id,
            ]);
        }
    }
}
