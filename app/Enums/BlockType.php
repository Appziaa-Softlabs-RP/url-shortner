<?php

namespace App\Enums;

enum BlockType: string
{
    case NAME = 'name';
    case DESCRIPTION = 'description';
    case HREF = 'href';
    case IMAGE = 'image';
    case ICON = 'icon';
    case COLOR = 'color';
    case SIZE = 'size';
}
