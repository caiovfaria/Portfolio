import bpy
import math
from pathlib import Path


project_root = Path(__file__).resolve().parents[1]
glb_path = project_root / "public" / "brand" / "logo-cvf-3d.glb"
blend_copy = project_root / "output" / "logo-cvf-3d-web.blend"

logo = next((obj for obj in bpy.context.scene.objects if obj.type in {"CURVE", "MESH"}), None)
if logo is None:
    raise RuntimeError("Nenhum objeto de logo foi encontrado no arquivo Blender.")

bpy.ops.object.select_all(action="DESELECT")
logo.select_set(True)
bpy.context.view_layer.objects.active = logo

bpy.ops.object.origin_set(type="ORIGIN_GEOMETRY", center="BOUNDS")
logo.location = (0.0, 0.0, 0.0)
logo.rotation_mode = "XYZ"
logo.rotation_euler = (0.0, 0.0, 0.0)

if logo.type == "CURVE":
    logo.data.extrude = max(logo.data.extrude, 0.02)
    logo.data.bevel_depth = max(logo.data.bevel_depth, 0.004)
    logo.data.bevel_resolution = 4
    logo.data.resolution_u = max(logo.data.resolution_u, 12)

material = bpy.data.materials.get("CVF Pearl") or bpy.data.materials.new("CVF Pearl")
material.diffuse_color = (0.92, 0.94, 0.98, 1.0)
material.metallic = 0.72
material.roughness = 0.2

if logo.data.materials:
    logo.data.materials[0] = material
else:
    logo.data.materials.append(material)

if logo.type == "CURVE":
    bpy.ops.object.convert(target="MESH")
    logo = bpy.context.active_object

# O glTF usa Y como eixo vertical. A logo nasce no plano XY do Blender,
# por isso precisa ficar no plano XZ antes da conversao para aparecer em pe.
logo.rotation_euler = (math.radians(90), 0.0, 0.0)
bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)

logo.name = "CVF_Monogram_3D"
bpy.context.scene.render.engine = "BLENDER_EEVEE"

glb_path.parent.mkdir(parents=True, exist_ok=True)
blend_copy.parent.mkdir(parents=True, exist_ok=True)

bpy.ops.wm.save_as_mainfile(filepath=str(blend_copy), copy=True)
bpy.ops.export_scene.gltf(
    filepath=str(glb_path),
    export_format="GLB",
    use_selection=True,
    export_apply=True,
    export_materials="EXPORT",
)

print(f"GLB_EXPORT={glb_path}")
print(f"BLEND_COPY={blend_copy}")
