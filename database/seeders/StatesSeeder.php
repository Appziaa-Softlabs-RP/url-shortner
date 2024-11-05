<?php

namespace Database\Seeders;

use App\Models\State;
use Illuminate\Database\Seeder;

class StatesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = \Illuminate\Support\Facades\File::get('database/data/states.json');
        $data = json_decode($json);
        foreach ($data as $state) {
            State::updateOrCreate([
                'name' => $state->name,
                'code' => $state->code,
                'country_id' => $state->country_id,
            ]);
        }
    }
}
