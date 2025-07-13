<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $courses = Course::All();
        
        return response()->json([
            'success' => true,
            'data' => $courses
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {  
       

        try {

             \Log::info("course store33");
             \Log::info("course store",$request->all());
            $validated = $request->validate([
                'title' => 'required|string|min:5|max:255',
                'description' => 'required|string|min:20',
                'price' => 'required|numeric|min:0',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'status' => 'required|in:active,inactive'
            ]);
            
            $course = new Course();
            $course->title = $validated['title'];
            $course->description = $validated['description'];
            $course->price = $validated['price'];
            $course->status = $validated['status'] == 'active';
            
            if ($request->hasFile('image')) {
                $imageName = Str::slug($validated['title']) . '-' . time() . '.' . $request->image->extension();
                $imagePath = $request->image->storeAs('courses', $imageName, 'public');
                $course->image = $imagePath;
            }

            $course->save();

            return response()->json([
                'success' => true,
                'data' => $course,
                'message' => 'Course created successfully'
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create course',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        return response()->json([
            'success' => true,
            'data' => $course
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|min:5|max:255',
            'description' => 'sometimes|string|min:20',
            'price' => 'sometimes|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'sometimes|in:active,inactive'
        ]);

        try {
            if ($request->has('title')) {
                $course->title = $validated['title'];
            }
            
            if ($request->has('description')) {
                $course->description = $validated['description'];
            }
            
            if ($request->has('price')) {
                $course->price = $validated['price'];
            }
            
            if ($request->has('status')) {
                $course->status = $validated['status'] == 'active';
            }

            if ($request->hasFile('image')) {
                
                if ($course->image) {
                    Storage::disk('public')->delete($course->image);
                }
                
                $imageName = Str::slug($course->title) . '-' . time() . '.' . $request->image->extension();
                $imagePath = $request->image->storeAs('courses', $imageName, 'public');
                $course->image = $imagePath;
            }

            $course->save();

            return response()->json([
                'success' => true,
                'data' => $course,
                'message' => 'Course updated successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update course',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        try {
            // Delete associated image
            if ($course->image) {
                Storage::disk('public')->delete($course->image);
            }

            $course->delete();

            return response()->json([
                'success' => true,
                'message' => 'Course deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete course',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}