import torch
import torchvision
from unet import UNet
model = UNet(3, 2)#自己定义的网络模型
model.load_state_dict(torch.load("ep300-loss0.052-val_loss0.055.pth"))#保存的训练模型
model.eval()#切换到eval（）
example = torch.rand(1, 3, 640, 640)#生成一个随机输入维度的输入
traced_script_module = torch.jit.trace(model, example)
traced_script_module.save("ep300-loss0.052-val_loss0.055.pt")
