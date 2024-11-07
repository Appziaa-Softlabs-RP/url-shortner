<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'title',
        'image',
        'slug',
        'description',
        'content',
        'views',
        'status',
        'created_by',
    ];

    protected $with = ['categories'];

    // created by as author
    // public function author()
    // {
    // return $this->belongsTo(User::class, 'created_by')->select('id', 'name');
    //

    public function getImageAttribute($value)
    {
        return url('storage/blogs/images/'.$value);
    }

    public function scopeActive($query)
    {
        return $query->where('status', 1);
    }

    public function categories()
    {
        // belongs to category via blog_categories table
        return $this->hasManyThrough(
            Category::class,
            BlogCategory::class,
            'blog_id',
            'id',
            'id',
            'category_id'
        );
    }

    public function latest()
    {
        return $this->orderBy('created_at', 'desc');
    }
}
